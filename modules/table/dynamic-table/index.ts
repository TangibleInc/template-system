const $ = window.jQuery
const { Table, ajax } = window.Tangible || {}

const debug = false // Show console.log - Set false before publish

const createLogger = (title) =>
  ['log', 'warn', 'error'].reduce((obj, key) => {
    obj[key] = (...args) =>
      key === 'log' && !debug
        ? null
        : window.console[key](`[${title}]`, ...args)
    return obj
  }, {})

const console = createLogger('Tangible Table')

const debounce = (func, delay) => {
  let timer
  return function () {
    clearTimeout(timer)
    timer = window.setTimeout(() => func.apply(this, arguments), delay)
  }
}

const cacheKey = '__tangibleTableRendered'

function activateTable(selector, options = {}) {
  if (!Table) {
    console.warn('Library not found')
    return
  }

  const el =
    typeof selector === 'string' ? document.querySelector(selector) : selector

  if (!el) {
    console.warn('Element not found', selector)
    return
  }

  if (el[cacheKey]) return
  el[cacheKey] = true

  const $el = $(el)

  /**
   * Create table options
   */

  const config = $el.data('tangibleTableConfig') || {}

  console.log('Config', config)

  const {
    name,

    // Table data
    rows = [],
    column_label: columnLabel = {},
    column_sort_enabled: columnSortEnabled = [],
    column_sort_type: columnSortType = {},

    pagination = true,
    pagination_template: paginationTemplate,

    empty_table_template: emptyTableTemplate = '', // Show when no rows

    // These are needed for dynamic render via AJAX
    row_loop: rowLoop,
    column_template: columnTemplate,
    column_order: columnOrder,
  } = config

  // Current state

  let currentPage = 1
  let {
    per_page: perPage = -1,
    total_pages: totalPages,

    sort_column: sortColumn,
    sort_order: sortOrder,
    sort_type: sortType,
  } = config

  let currentSearch = ''
  let currentSearchColumns = []

  let currentFilterByColumnValues = {}

  /**
   * Table class creates a <table> element inside container, and appends
   * to its parent a pagination element
   */
  let $container = $('<div><div></div></div>')
  const element = $container.find('div')[0]

  const tableOptions = {
    ...options,

    element,
    // searchField: '',

    data: rows,
    columns: columnLabel,
    sorting: columnSortEnabled,

    rowsPerPage: perPage === -1 ? 999 : perPage,
    pagination,
    totalPages,
    paginationTemplate,

    // See event handlers defined below
    onPaginationChange,
    onColumnSort,

    // Filters are manually handled
    // onUpdateRowsPerPage,
    // onSearch
  }

  const table = new Table(tableOptions)

  console.log('Created', tableOptions)

  // Replace existing table's content and move pagination after it

  $el.empty().append($container.find('table').children())

  const $pagination = $container.find('.tangible-table-pagination')

  $pagination.insertAfter($el)

  $el.wrap('<div class="tangible-table-overflow"></div>')

  const $emptyTableTemplate = $(
    '<div class="tangible-table-on-empty">' + emptyTableTemplate + '</div>'
  )

  $emptyTableTemplate.hide()
  $emptyTableTemplate.insertAfter($pagination)

  $container = $el.closest('.tangible-table-container')

  const $table = $el

  /**
   * Fetch new table data via AJAX
   */

  const tableDataCache = {}

  const createCacheKey = (obj) => {
    const keys = Object.keys(obj)

    keys.sort()

    return keys.reduce((str, key) => {
      return `${str}${key}=${JSON.stringify(obj[key])},`
    }, '')
  }

  function createTableRequest(request = {}) {
    const tableRequest = {
      page: currentPage,
      per_page: perPage,

      row_loop: rowLoop,
      column_order: columnOrder,

      sort_column: sortColumn,
      sort_order: sortOrder,
      sort_type: sortType,

      search: currentSearch,
      search_columns: currentSearchColumns,

      filter_by_column_values: currentFilterByColumnValues,

      ...request,
    }

    // Create unique key to cache request
    const cacheKey = createCacheKey(tableRequest)

    return {
      tableRequest: {
        ...tableRequest,
        // Excluded from cache key
        column_template: columnTemplate,
        column_sort_type: columnSortType,
      },
      cacheKey,
    }
  }

  function handleEmptyTable(hasData = false) {
    // Called on search or filter - Show empty table template as needed

    if (hasData) {
      $emptyTableTemplate.hide()
      $table.show()
      $container.removeClass('is-empty-table')
    } else {
      $table.hide()
      $emptyTableTemplate.show()
      $container.addClass('is-empty-table')
    }
  }

  function fetchTableData(request = {}) {
    const { tableRequest, cacheKey } = createTableRequest(request)

    return new Promise((resolve, reject) => {
      if (tableDataCache[cacheKey]) {
        const cached = tableDataCache[cacheKey]

        // console.log('fetchTableData cached', cached)

        return resolve(cached)
      }

      console.log('fetchTableData', tableRequest)

      $container.addClass('loading')

      ajax('tangible_table_data', tableRequest)
        .then(function (response) {
          tableDataCache[cacheKey] = response

          console.log('fetchTableData success', response)
          resolve(response)

          $container.removeClass('loading')
        })
        .catch(function (e) {
          console.log('fetchTableData error', e)
          resolve() // NOTE: Caller must check for undefined

          $container.removeClass('loading')
        })
    })
  }

  // Cache initial page

  const { cacheKey: initialCacheKey } = createTableRequest()

  tableDataCache[initialCacheKey] = {
    rows,
    total_pages: totalPages,
  }

  /**
   * Event handlers
   */

  function onPaginationChange(pageIndex) {
    console.log('Get page', pageIndex + 1)

    currentPage = pageIndex + 1

    fetchTableData().then(function (response) {
      if (!response) return
      table.setPage(pageIndex, response.rows)
    })
  }

  function onUpdateRowsPerPage(rowsPerPage) {
    console.log('onUpdateRowsPerPage', rowsPerPage)
  }

  function onColumnSort(column, order) {
    currentPage = 1
    sortColumn = column
    sortOrder = order
    sortType = columnSortType[column] || 'string'

    console.log('onColumnSort', currentPage, sortColumn, sortOrder, sortType)

    fetchTableData().then(function (response) {
      if (!response) return
      const pageIndex = currentPage - 1
      table.setPage(pageIndex, response.rows)
    })
  }

  function onSearch(value, searchColumns) {
    console.log('onSearch', value, searchColumns)

    currentPage = 1
    currentSearch = value
    currentSearchColumns = searchColumns || table.getVisibleColumns()

    fetchTableData().then(function (response) {
      if (!response) return

      console.log('Search result', response)

      table.setTotalPages(response.total_pages || 1)

      const pageIndex = currentPage - 1
      const currentRows = response.rows || []

      table.setPage(pageIndex, currentRows)

      handleEmptyTable(currentRows.length)
    })
  }

  // Filters

  const $filterForm = $container.find('.tangible-table-filter-form')

  if (!$filterForm.length) return

  const runFilter = function ({
    $field,
    tag,
    name,
    type,
    action,
    filterColumns,
  }) {
    const value = $field.val()

    console.log('Filter', action, name, value)

    if (action === 'loop' || action === 'column') {
      if (action === 'column') {
        // Filter by column value

        // If value is empty, clear previous filter
        if (!value.length) {
          delete currentFilterByColumnValues[name]
        } else {
          currentFilterByColumnValues[name] = {
            value,
          }
        }
      } else {
        // Filter by loop attribute

        rowLoop.attributes[name] = value
      }

      fetchTableData().then(function (response) {
        if (!response) return

        totalPages = response.total_pages || 1 // Minimum

        if (currentPage > totalPages) {
          currentPage = totalPages
        }

        table.setTotalPages(totalPages)

        const pageIndex = currentPage - 1
        const currentRows = response.rows || []

        table.setPage(pageIndex, currentRows)

        handleEmptyTable(currentRows.length)
      })

      return
    }

    if (action === 'search') {
      onSearch(value, filterColumns)
      // table.search( value, filterColumns )

      return
    }

    if (action === 'perPage') {
      onUpdateRowsPerPage(parseInt(value, 10))
      return
    }

    // Unkown action
  }

  $filterForm.each(function () {
    const $form = $(this)

    $form.find('select,input').each(function () {
      const $field = $(this)

      const tag = $field.prop('tagName').toLowerCase()
      const name = $field.attr('name')

      const type = tag === 'select' ? 'select' : $field.attr('type')
      const action = $field.data('tangibleTableFilterAction') || 'loop'

      const filterColumns = $field.data('tangibleTableFilterColumns')

      const onAction = function () {
        runFilter({
          $field,
          tag,
          name,
          type,
          action,
          filterColumns,
        })
      }

      $field.on('change', onAction)

      if (type === 'text') {
        $field.on('input', debounce(onAction, 500)) // Limit frequency
      }
    })

    $form.on('submit', function (e) {
      e.preventDefault()
    })
  })
}

$('.tangible-table').each(function () {
  activateTable(this)
})

window.Tangible = window.Tangible || {}
window.Tangible.activateTable = activateTable
