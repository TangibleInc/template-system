/**
 * Ravi Dhiman <ravid7000@gmail.com>
 * TableSortable
 */

// import $ from 'jquery'
import DataSet from './DataSet'
import Pret from './renderEngine'
import * as Utils from './utils'
import { generatePageRange } from './pagination'

const $ = window.jQuery

class TableSortable {
  _name = 'tableSortable'
  _defOptions = {
    element: '',
    data: [],
    columns: {},
    visibleColumns: null, // Optional: All keys of "columns" by default

    classPrefix: 'tangible-table',

    buttonClass: 'tangible-table-button',
    activeButtonClass: 'tangible-table-button active',
    buttonGroupClass: 'tangible-table-button-group',

    paginationContainerClass: 'tangible-table-pagination-container',
    paginationLeftColumnClass: 'tangible-table-pagination-left-column',
    paginationRightColumnClass: 'tangible-table-pagination-right-column',

    sorting: true,
    pagination: true,
    paginationContainer: null,
    paginationTemplate: `<span data-tangible-table-paginator-field="current"></span> of <span data-tangible-table-paginator-field="total"></span> pages`,
    rowsPerPage: 10,

    formatCell: null,
    formatHeader: null,

    searchField: null,
    responsive: {},
    totalPages: 0,
    sortingIcons: {
      asc: '<span> ▲</span>',
      desc: '<span> ▼</span>',
    },
    prevText: '<span>◀︎</span>',
    nextText: '<span>▶︎</span>',

    tableWillMount: () => {},
    tableDidMount: () => {},
    tableWillUpdate: () => {},
    tableDidUpdate: () => {},
    tableWillUnmount: () => {},
    tableDidUnmount: () => {},
    onPaginationChange: null,
    onColumnSort: null,
    onSearch: null,
    onUpdateRowsPerPage: null,
  }
  _styles = null
  _dataset = null
  _table = null
  _thead = null
  _tbody = null
  _isMounted = false
  _isUpdating = false
  _sorting = {
    currentCol: '',
    dir: '',
  }
  _pagination = {
    elm: null,
    currentPage: 0,
    totalPages: 1,
    visiblePageNumbers: 5,
    pageData: [], // Optional: Data per page from server-side
  }
  _cachedOption = null
  _cachedViewPort = -1

  constructor(options) {
    this.options = $.extend(this._defOptions, options)
    delete this._defOptions

    this._rootElement = $(this.options.element)
    ;[
      'classPrefix',
      'buttonClass',
      'activeButtonClass',
      'buttonGroupClass',
      'paginationContainerClass',
      'paginationLeftColumnClass',
      'paginationRightColumnClass',
    ].forEach((key) => {
      this[key] = this.options[key]
    })

    this.engine = Pret()

    this.html = this.engine.createElement

    this.init()
    this._debounceUpdateTable()
  }

  /**
   * logError
   * @param {bool} condition
   * @param {string} fn
   * @param {string} msg
   * @param  {*} rest
   */
  logError(condition, fn, msg, ...rest) {
    Utils._invariant(condition, `${this._name}.${fn} ${msg}`, ...rest)
  }

  logWarn(condition, opt, msg) {
    if (condition) {
      console.warn(`${this._name}.options.${opt} ${msg}`)
    }
  }

  emitLifeCycles(key, ...rest) {
    if (!this.options) {
      return
    }
    const { options } = this
    if (Utils._isFunction(options[key])) {
      options[key].apply(this, rest)
    }
  }

  setVisibleColumns(columnKeys) {
    this.options.visibleColumns =
      columnKeys || Object.keys(this.options.columns)
  }

  getVisibleColumns() {
    return this.options.visibleColumns
  }

  setPage(pageNo, data) {
    this.logError(
      Utils._isNumber(pageNo),
      'setPage',
      'expect argument as number'
    )

    const { totalPages } = this._pagination

    if (Utils._isNumber(pageNo)) {
      if (pageNo > totalPages - 1) {
        pageNo = totalPages - 1
      }

      this._pagination.currentPage = pageNo

      if (data) {
        this.setCurrentPageData(data)

        // Original: Doesn't paginate correctly
        // this._dataset.pushData(data)
      }

      this.updateTable()
    }
  }

  clearPageData() {
    this._pagination.pageData = []
  }

  setTotalPages(totalPages) {
    if (totalPages === 0) totalPages = 1
    this.options.totalPages = this._pagination.totalPages = totalPages
    if (this._pagination.currentPage > totalPages - 1) {
      this._pagination.currentPage = totalPages - 1
    }
  }

  setCurrentPageData(data) {
    // Override current page data
    this._pagination.pageData[this._pagination.currentPage] = data
  }

  updateRowsPerPage(rowsPerPage) {
    this.logError(
      Utils._isNumber(rowsPerPage),
      'updateRowsPerPage',
      'expect argument as number'
    )

    if (!rowsPerPage) return

    const { onUpdateRowsPerPage } = this.options

    this._pagination.currentPage = 0 // Reset pagination
    this.options.rowsPerPage = rowsPerPage

    if (onUpdateRowsPerPage) {
      // Callback should setData to refresh table
      onUpdateRowsPerPage(rowsPerPage)
    } else {
      this.updateTable()
    }
  }

  search(val, cols = []) {
    this.logError(
      cols && Utils._isArray(cols),
      'search',
      'second argument must be array of keys'
    )

    if (!cols.length) {
      cols = this.getVisibleColumns()
    }

    this._pagination.currentPage = 0

    const { onSearch } = this.options

    if (onSearch) {
      onSearch(val, cols)
    } else {
      this._dataset.search(val, cols)
      this.debounceUpdateTable()
    }
  }

  // Backward compatibility
  lookUp(val, cols) {
    return this.search(val, cols)
  }

  _bindSearchField() {
    const self = this
    const { searchField } = this.options
    if (!searchField) {
      return
    }
    const field = $(searchField)
    this.logError(
      field.length,
      'searchField',
      '"%s" is not a valid DOM element or string',
      field
    )
    field.on('input', function () {
      const val = $(this).val()
      self.search(val)
    })
    this.options.searchField = field
  }

  /**
   * _validateRootElement
   */
  _validateRootElement() {
    this.logError(
      this._rootElement.length,
      'element',
      '"%s" is not a valid root element',
      this._rootElement
    )
  }

  /**
   * _createTable
   */
  _createTable() {
    this._table = $('<table></table>').addClass('table ' + this.classPrefix)
  }

  /**
   * _initDataset
   */
  _initDataset() {
    const { data } = this.options
    this.logError(
      Utils._isArray(data),
      'data',
      'table-sortable only supports collections. Like: [{ key: value }, { key: value }]'
    )
    const dataset = new DataSet()
    dataset.fromCollection(data)
    this._dataset = dataset
  }

  /**
   * _validateColumns
   */
  _validateColumns() {
    const { columns } = this.options
    this.logError(
      Utils._isObject(columns),
      'columns',
      'Invalid column type, see docs'
    )
  }

  sortData(column) {
    let { dir, currentCol } = this._sorting

    if (column !== currentCol) {
      dir = ''
    }
    if (!dir) {
      dir = this._dataset.sortDirection.ASC
    } else if (dir === this._dataset.sortDirection.ASC) {
      dir = this._dataset.sortDirection.DESC
    } else if (dir === this._dataset.sortDirection.DESC) {
      dir = this._dataset.sortDirection.ASC
    }

    currentCol = column

    this._sorting = {
      dir,
      currentCol,
    }

    const { onColumnSort } = this.options

    if (onColumnSort) {
      onColumnSort.apply(this, [currentCol, dir])
    } else {
      this._dataset.sort(currentCol, dir)
      this.updateCellHeader()
    }
  }

  /**
   * _addColSorting
   * @param {[]} col
   * @param {string} key
   * @return {{ col }}
   */
  _addColSorting(col, key) {
    const { sorting } = this.options
    const self = this
    if (!sorting) return col

    if (sorting && !Utils._isArray(sorting)) {
      col = $(col)
      col.attr('role', 'button')
      col.addClass(this.classPrefix + '-sortable-column-header')
      if (key === this._sorting.currentCol && this._sorting.dir) {
        col.append(this.options.sortingIcons[this._sorting.dir])
      }
      col.click(function (e) {
        self.sortData(key)
      })
    }

    if (Utils._isArray(sorting)) {
      Utils._forEach(sorting, (part) => {
        if (key === part) {
          col = $(col)
          col.attr('role', 'button')
          col.addClass(this.classPrefix + '-sortable-column-header')
          if (key === this._sorting.currentCol && this._sorting.dir) {
            col.append(this.options.sortingIcons[this._sorting.dir])
          }
          col.click(function (e) {
            self.sortData(key)
          })
        }
      })
    }

    return col
  }

  /**
   * getCurrentPageIndex
   * @returns {{ from: Number, to: Number? }} obj
   */
  getCurrentPageIndex() {
    const { _datasetLen } = this._dataset
    const { pagination, rowsPerPage } = this.options
    const { currentPage } = this._pagination // current page in pagination
    if (!pagination) {
      return {
        from: 0,
      }
    }
    let from = currentPage * rowsPerPage // list start index
    const to = Math.min(from + rowsPerPage, _datasetLen)
    from = Math.min(from, to)
    return {
      from,
      to,
    }
  }

  _renderHeader(parentElm) {
    if (!parentElm) {
      parentElm = $('<thead class="' + this.classPrefix + '-head"></thead>')
    }

    const { html } = this
    const { columns, formatHeader } = this.options
    const cols = []

    const colKeys = this.getVisibleColumns() // Utils._keys(columns)

    // create header
    Utils._forEach(colKeys, (part, i) => {
      let c
      if (Utils._isFunction(formatHeader)) {
        c = formatHeader(columns[part], part, i)
      } else {
        c = `<div>${columns[part]}</div>`
      }
      c = this._addColSorting(c, part)
      const tbd = html('th', {
        html: c,
      })
      cols.push(tbd)
    })

    const thr = html('tr', null, cols)
    return this.engine.render(thr, parentElm)
  }

  _renderBody(parentElm) {
    if (!parentElm) {
      parentElm = $('<tbody class="' + this.classPrefix + '-body"></tbody>')
    }
    const engine = this.engine
    const { html } = this

    const { columns, formatCell } = this.options
    const { from, to } = this.getCurrentPageIndex()
    const { currentPage } = this._pagination

    let currentPageData = []

    if (this._pagination.pageData[currentPage]) {
      // Current page data set by onPaginationChange
      currentPageData = this._pagination.pageData[currentPage]
    } else if (to === undefined) {
      currentPageData = this._dataset.top()
    } else {
      currentPageData = this._dataset.get(from, to)
    }

    const rows = [] // list of rows in body

    const colKeys = this.getVisibleColumns() // Utils._keys(columns)

    // create body
    Utils._forEach(currentPageData, function (part, i) {
      const cols = []
      Utils._forEach(colKeys, (key) => {
        const tbd = html('td', {
          html: Utils._isFunction(formatCell)
            ? formatCell(part, key)
            : part[key + '__display'] !== undefined
            ? part[key + '__display']
            : part[key],
        })

        cols.push(tbd)
      })
      rows.push(html('tr', null, cols))
    })
    return engine.render(rows, parentElm)
  }

  /**
   * _createCells
   * @returns {{ thead: [], tbody: [] }}
   */
  _createCells() {
    const thead = this._renderHeader()
    const tbody = this._renderBody()
    return { thead, tbody }
  }

  onPaginationBtnClick(dir, currPage) {
    let { totalPages, currentPage } = this._pagination
    const { onPaginationChange } = this.options

    if (dir === 'up') {
      if (currentPage < totalPages - 1) {
        currentPage += 1
      }
    } else if (dir === 'down') {
      if (currentPage >= 0) {
        currentPage -= 1
      }
    }

    const setPage = this.setPage.bind(this)

    if (Utils._isFunction(onPaginationChange)) {
      const cp = !isNaN(currPage) ? currPage : currentPage
      onPaginationChange.apply(this, [cp, setPage])
    } else {
      if (currPage !== undefined) {
        this._pagination.currentPage = currPage
      } else {
        this._pagination.currentPage = currentPage
      }
      this.updateTable()
    }
  }

  renderPagination(parentElm) {
    const self = this
    const engine = this.engine
    const { html } = this

    const {
      pagination,
      paginationContainer,
      paginationTemplate,
      prevText,
      nextText,
    } = this.options

    if (!pagination) {
      return parentElm
    }

    const { currentPage, totalPages, visiblePageNumbers } = this._pagination

    if (!parentElm) {
      parentElm = $('<div class="' + this.classPrefix + '-pagination"></div>')
      const existingPaginationContainer = $(paginationContainer)
      if (existingPaginationContainer.length) {
        existingPaginationContainer.append(parentElm)
      } else {
        this._rootElement.after(parentElm) // Original: this._table.after(parentElm)
      }
    }

    const buttons = []
    const prevBtn = html('button', {
      className: this.buttonClass,
      html: prevText,
      disabled: currentPage === 0,
      onClick: () => self.onPaginationBtnClick('down'),
    })

    buttons.push(prevBtn)

    const pages = generatePageRange(currentPage + 1, totalPages)

    for (const page of pages) {
      if (page === '...') {
        buttons.push(
          html('button', {
            className: this.buttonClass,
            disabled: true,
            text: '…', //'...',
          })
        )

        continue
      }

      const isActive = currentPage + 1 === page
      const toPage = page

      buttons.push(
        html('button', {
          className: isActive ? this.activeButtonClass : this.buttonClass,
          onClick: function (e) {
            self.onPaginationBtnClick(null, toPage - 1)
          },
          text: page,
          'data-page': page,
        })
      )
    }

    const nextBtn = html('button', {
      className: this.buttonClass,
      html: nextText,
      disabled: currentPage >= totalPages - 1,
      onClick: () => self.onPaginationBtnClick('up'),
    })

    buttons.push(nextBtn)

    let paginationLabel = ''

    if (totalPages >= 2) {
      const $pagination = $(`<div>${paginationTemplate}</div>`)

      $pagination
        .find('[data-tangible-table-paginator-field="current"]')
        .text(currentPage + 1)
      $pagination
        .find('[data-tangible-table-paginator-field="total"]')
        .text(totalPages)

      paginationLabel = $pagination
    }

    const pageRow = html(
      'div',
      {
        className: this.paginationContainerClass,
      },
      [
        html(
          'div',
          {
            className: this.paginationLeftColumnClass,
          },
          paginationLabel
        ),
        html(
          'div',
          {
            className: this.paginationRightColumnClass,
          },
          html(
            'div',
            {
              className: this.buttonGroupClass,
            },
            totalPages < 2 ? '' : buttons
          )
        ),
      ]
    )

    return engine.render(pageRow, parentElm)
  }

  createPagination() {
    const { pagination, totalPages, rowsPerPage } = this.options
    if (!pagination) {
      return false
    }

    this.logError(
      rowsPerPage && Utils._isNumber(rowsPerPage),
      'rowsPerPage',
      'should be a number greater than zero.'
    )

    this.logError(
      Utils._isNumber(totalPages),
      'totalPages',
      'should be a number greater than zero.'
    )

    let totalP = totalPages
      ? totalPages
      : Math.ceil(this._dataset._datasetLen / rowsPerPage)
    if (0 >= totalP) {
      totalP = 1
    }

    this._pagination.totalPages = totalP

    if (this._pagination.elm) {
      this.renderPagination(this._pagination.elm)
    } else {
      this._pagination.elm = this.renderPagination()
    }
  }

  /**
   * _generateTable
   * @param {[]]} thead
   * @param {[]} tbody
   */
  _generateTable(thead, tbody) {
    this._table.html('')
    this._table.append(thead)
    this._table.append(tbody)
    this._thead = thead
    this._tbody = tbody
  }

  /**
   * _renderTable
   */
  _renderTable() {
    if (this._rootElement.is('table')) {
      this._rootElement.html(this._table.html())
    } else {
      const div = this.html('div', {
        className: this.classPrefix + '-container',
        append: this._table,
      })
      this._rootElement = this.engine.render(div, this._rootElement)
    }
  }

  _initStyles() {
    /*
      const { responsive } = this.options
      if (responsive) {
        return
      }

      const css =
            '.' + this.classPrefix + '-container .table{table-layout:fixed}@media(max-width:767px){.' + this.classPrefix + '-container{overflow:auto;max-width:100%}}'

      const style = $('<style></style>')
      style.attr('id', this.classPrefix)
      style.html(css)
      $('head').append(style)

      this._styles = style
*/
  }

  /**
   * init
   * @description Initial rendering
   */
  init() {
    this.emitLifeCycles('tableWillMount')
    this._validateRootElement()
    this._initDataset()
    this._createTable()
    this.setVisibleColumns()
    this._validateColumns()
    const { thead, tbody } = this._createCells()
    this._generateTable(thead, tbody)
    this._renderTable()
    this.createPagination()
    this._bindSearchField()
    this._initStyles()
    this._isMounted = true
    this.emitLifeCycles('tableDidMount')
    if (this._cachedViewPort === -1) {
      this.resizeSideEffect()
    }
  }

  /**
   * Updation phase
   * 1. When clicked on sorting
   * 2. When clicked on pagination
   * 3. When external data changed
   *
   * Updation phase will not distroy table completely. It will re-render table cells and pagination.
   */

  _debounceUpdateTable() {
    this.debounceUpdateTable = Utils.debounce(this.updateTable, 400)
  }

  updateTable() {
    if (this._isUpdating) {
      return
    }

    this.emitLifeCycles('tableWillUpdate')
    this._isUpdating = true
    this._renderHeader(this._thead)
    this._renderBody(this._tbody)
    this.createPagination()
    this._isUpdating = false
    this.emitLifeCycles('tableDidUpdate')
  }

  updateCellHeader() {
    if (this._isUpdating) {
      return
    }

    this._isUpdating = true
    this.emitLifeCycles('tableWillUpdate')
    this._renderHeader(this._thead)
    this._renderBody(this._tbody)
    this._isUpdating = false
    this.emitLifeCycles('tableDidUpdate')
  }

  resizeSideEffect() {
    const mkRes = Utils.debounce(this.makeResponsive, 500)
    window.addEventListener('resize', mkRes.bind(this))
    this.makeResponsive()
  }

  makeResponsive() {
    const { responsive } = this.options
    const { innerWidth } = window
    const keys = Utils._sort(Utils._keys(responsive), 'desc')
    let minPort

    this.logError(
      Utils._isObject(responsive),
      'responsive',
      'Invalid type of responsive option provided: "%s"',
      responsive
    )

    Utils._forEach(keys, (viewPort) => {
      if (parseInt(viewPort, 10) > innerWidth) {
        minPort = viewPort
      }
    })

    if (this._cachedViewPort === minPort) {
      return
    }
    this._cachedViewPort = minPort
    const resOptions = responsive[minPort]
    if (Utils._isObject(resOptions)) {
      if (!this._cachedOption) {
        this._cachedOption = $.extend({}, this.options)
      }
      this.options = $.extend(this.options, resOptions)
      this.refresh()
    } else if (this._cachedOption) {
      this.options = $.extend({}, this._cachedOption)
      this._cachedOption = null
      this._cachedViewPort = -1
      this.refresh()
    }
    return
  }

  /**
   * public APIs
   */
  setData = (data, columns, pushData) => {
    this.logError(
      Utils._isArray(data),
      'setData',
      'expect first argument as array of objects'
    )
    if (this._isMounted && data) {
      if (pushData) {
        this._dataset.pushData(data)
      } else {
        this._dataset.fromCollection(data)
      }
      if (columns) {
        this.logError(
          Utils._isObject(columns),
          'setData',
          'expect second argument as objects'
        )
        this.options.columns = columns
      }
      this.refresh()
    }
  }

  /**
   * getData
   * @returns {[{}]}
   */
  getData = () => {
    if (this._isMounted) {
      return this._dataset.top()
    }
    return []
  }

  /**
   * getCurrentPageData
   * @returns {[{}]}
   */
  getCurrentPageData = () => {
    if (this._isMounted) {
      const { rowsPerPage } = this.options
      const { currentPage } = this._pagination
      const from = currentPage * rowsPerPage
      const to = from + rowsPerPage
      return this._dataset.get(from, to)
    }
    return []
  }

  /**
   * refresh
   * @description This method will distroy and create a fresh table.
   * @param {boolean?} hardRefresh
   */
  refresh = (hardRefresh) => {
    if (hardRefresh) {
      this.distroy()
      this.create()
    } else if (this._isMounted) {
      this.updateTable()
    }
  }

  /**
   * distroy
   * @description This method will distroy table.
   */
  distroy = () => {
    if (this._isMounted) {
      this.emitLifeCycles('tableWillUnmount')
      this._table.remove()
      if (this._styles && this._styles.length) {
        this._styles.remove()
        this._styles = null
      }
      this._dataset = null
      this._table = null
      this._thead = null
      this._tbody = null
      if (this._pagination.elm) {
        this._pagination.elm.remove()
      }
      this._pagination = {
        elm: null,
        currentPage: 0,
        totalPages: 0,
        visiblePageNumbers: 5,
      }
      this._isMounted = false
      this._isUpdating = false
      this._sorting = {
        currentCol: '',
        dir: '',
      }
      this._cachedViewPort = -1
      this._cachedOption = null
      this.emitLifeCycles('tableDidUnmount')
    }
  }

  /**
   * create
   * @description This method will create a fresh table.
   */
  create = () => {
    if (!this._isMounted) {
      this.init()
    }
  }
}

TableSortable.Pret = Pret
TableSortable.DataSet = DataSet
;(function ($) {
  $.fn.tangibleTable = function (options) {
    this.each(function () {
      options.element = $(this)
      return new TableSortable(options)
    })
  }
})(jQuery)

export default TableSortable
