import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Chart } from 'chart.js'
import get from 'lodash/get'
import set from 'lodash/set'

// Note: Had to convert these to require CommonJS-style, to avoid
// issues inmporting their ESM modules
// const Chart = require('chart.js')
// const get = require('lodash/get')
// const set = require('lodash/set')


// Register the plugin to all charts:
Chart.register(ChartDataLabels)

window.Tangible = window.Tangible || {}
window.Tangible.Chart = Chart

const $ = window.jQuery

$.fn.tangibleChart = function (config = {}) {
  const $el = this // jQuery object

  if ($el.length === 0) {
    return $el
  }

  if ($el.length > 1) {
    $el.each(function () {
      $(this).tangibleChart(config)
    })
    return $el
  }

  const el = $el[0] // DOMElement

  if (el.tangibleChartLoaded) return
  el.tangibleChartLoaded = true

  // Merge options from element's data attribtue

  const optionsFromElement = $el.data('tangibleDynamicModuleOptions')

  if (
    optionsFromElement &&
    typeof optionsFromElement === 'object' &&
    !Array.isArray(optionsFromElement)
  ) {
    // Valid options
    Object.assign(config, optionsFromElement)
  }

  // Canvas

  let canvas = $el.find('canvas')[0]

  if (!canvas) {
    canvas = document.createElement('canvas')
    $el.append(canvas)
  }

  const context = canvas.getContext('2d')

  // Data

  // Check child nodes to see if data was passed by extended tags, such as GFChartData

  if (!config.data.datasets.length) {
    const $data = $el.find('[data-tangible-dynamic-module="chart-data"]')
    if ($data.length) {
      const data = $data.data('tangibleDynamicModuleOptions')
      if (typeof data === 'object') {
        Object.assign(config.data, data)
      }
    }
  }

  //console.log('config',config)
  //console.log(Chart.defaults)

  // Prepare chart options

  const {
    type,
    data: { labels, datasets },
    options,
    tickValues,
    tooltipValues,
  } = config

  const styleOptionNames = [
    'fill',
    'backgroundColor',
    'borderColor',
    'borderWidth',
  ]

  datasets.forEach((data, index) => {
    styleOptionNames.forEach((key) => {
      data[key] = data[key] || config[key]
    })

    if (!data.borderWidth) data.borderWidth = 1

    // Cast colors for specific types
    if (type === 'bar') {
      ;['backgroundColor', 'borderColor'].forEach((key) => {
        if (config[key] && config[key][index]) {
          data[key] = config[key][index]
        }
      })
    }
  })

  const chartOptions = {
    type,
    data: {
      labels,
      datasets,
    },
    options,
    tickValues,
    tooltipValues,
  }

  // indexAxis - if 'y' it is horizontal bar for example

  const indexAxis = get(chartOptions, 'options.indexAxis')
  const axis = indexAxis === 'y' ? 'x' : 'y'

  // if we have 'y' value, let's flip axis titles accordingly
  if (indexAxis === 'y') {
    const x_title = get(chartOptions, 'options.scales.x.title')
    const y_title = get(chartOptions, 'options.scales.y.title')

    set(chartOptions, 'options.scales.x.title', y_title)
    set(chartOptions, 'options.scales.y.title', x_title)
  }

  // axis chartOptions object path
  var axes_path = indexAxis === 'y' ? 'options.scales.x' : 'options.scales.y'

  // data from datasets

  var axes_data = get(chartOptions, 'data.datasets[0].data')

  // Set ticks

  const tick_values = get(chartOptions, 'tickValues')

  // Set max value if max_value was passed by extended tags,such as GFChartData, and override

  const set_max_value = (axes_data = [], max) => {
    // Check child nodes to see
    const $max_value = $el.find('[data-tangible-dynamic-module="chart-data"]')
    if ($max_value.length) max = $max_value.data('tangibleMaxPossibleValue')

    // If we still don't have max value try to assign maximum value from data array
    if (!max) {
      max = axes_data.length ? Math.max(...axes_data) : 0
    }
    return max
  }

  if (
    tick_values &&
    typeof tick_values === 'object' &&
    !Array.isArray(tick_values)
  ) {
    const {
      min_value,
      max_value,
      min_percent,
      max_percent,
      show_in,
      text_before,
      text_after,
    } = tick_values

    // show percentage

    const show_in_percent = show_in && show_in == 'percent' ? true : false

    // text before and after

    const before = text_before ? text_before : ''
    const after = text_after ? text_after : ''

    //min values

    const min = !min_value ? 0 : min_value
    const min_p = !min_percent ? 0 : min_percent

    //max values

    const max = set_max_value(axes_data, max_value)
    const max_p = !max_percent ? 100 : max_percent

    if (show_in_percent) {
      // check if all data are number and replace with percent

      if (axes_data) {
        var is_number = true
        var percent_data = []
        axes_data.forEach((el, idx) => {
          if (!Number.isNaN(Number.parseFloat(el)) === false) {
            is_number = false
            return
          } else {
            percent_data[idx] = Math.round((el / max) * 100 * 100) / 100
          }
        })

        if (is_number) {
          //callback

          const callback = (value) => {
            return before + ' ' + value + '%' + ' ' + after
          }

          // set all things up

          // percent data
          set(chartOptions, 'data.datasets[0].data', percent_data)

          // axes min/max percentage
          set(chartOptions, axes_path + '.min', min_p)
          set(chartOptions, axes_path + '.max', max_p)

          //callback
          set(chartOptions, axes_path + '.ticks.callback', callback)
        }
      }
    } else if (!show_in_percent && (before || after)) {
      //callback

      const callback = (value) => {
        return before + ' ' + value + ' ' + after
      }

      // axes min/max percentage
      set(chartOptions, axes_path + '.min', min)
      set(chartOptions, axes_path + '.max', max)

      // set
      set(chartOptions, axes_path + '.ticks.callback', callback)
    }
  }

  // Set tooltip

  const tooltip_values = get(chartOptions, 'tooltipValues')

  if (
    tooltip_values &&
    typeof tooltip_values === 'object' &&
    !Array.isArray(tooltip_values)
  ) {
    const {
      max_value,
      show, //percent,value,both; default: value
      show_label,
      custom_label,
      custom_label_text,
    } = tooltip_values

    // if to display label

    const if_show_label =
      show_label === true || undefined === show_label ? true : false

    //max value

    const max = set_max_value(axes_data, max_value)

    // tooltip enabled

    const tooltip_enabled = get(chartOptions, 'options.plugins.tooltip.enabled')

    if (tooltip_enabled === true || undefined === tooltip_enabled) {
      let callbacks = {}

      if (show === 'percent') {
        //callback

        const label_cb = (context) => {
          var label = context.dataset.label || ''

          if (custom_label === true)
            label = custom_label_text ? custom_label_text : ''

          if (label) {
            label += ': '
          }

          //if ticks set in percent data already overriden, just add '%', otherwise calculate percent
          if (context.parsed[axis] !== null) {
            if (tick_values.show_in == 'percent') {
              label += context.parsed[axis] + '%'
            } else {
              const data = axes_data[context.dataIndex]
              const percent = Math.round((data / max) * 100 * 100) / 100
              label += percent + '%'
            }
          }

          return if_show_label ? label : ''
        }

        callbacks.label = label_cb
      } else if (show === 'both') {
        //callback

        const label_cb = (context) => {
          const data = axes_data[context.dataIndex]
          var label = context.dataset.label || ''

          if (custom_label === true)
            label = custom_label_text ? custom_label_text : ''

          if (label) {
            label += ': '
          }

          if (context.parsed[axis] !== null) {
            label += data
          }

          return if_show_label ? label : ''
        }

        // afterBody callback

        const afterBody_cb = (context) => {
          var after_body = ''

          //if ticks set in percent data are already overriden, just add '%', otherwise calculate percent
          if (context[0].parsed[axis] !== null) {
            if (tick_values.show_in == 'percent') {
              after_body += '(' + context[0].parsed[axis] + '%' + ')'
            } else {
              const data = axes_data[context[0].dataIndex]
              const percent = Math.round((data / max) * 100 * 100) / 100
              after_body += '(' + percent + '%' + ')'
            }
          }

          return if_show_label ? after_body : ''
        }

        callbacks.label = label_cb
        callbacks.afterBody = afterBody_cb
      } else {
        //callback

        const label_cb = (context) => {
          const data = axes_data[context.dataIndex]
          var label = context.dataset.label || ''

          if (custom_label === true)
            label = custom_label_text ? custom_label_text : ''

          if (label) {
            label += ': '
          }

          if (context.parsed[axis] !== null) {
            if (tick_values.show_in == 'percent' && show !== 'value') {
              label += context.parsed[axis] + '%'
            } else {
              label += data
            }
          }

          return if_show_label ? label : ''
        }

        callbacks.label = label_cb
      }

      set(chartOptions, 'options.plugins.tooltip.callbacks', callbacks)
    }
  }

  // Set datalabels

  const datalabels = get(chartOptions, 'options.plugins.datalabels')

  //percent label

  const pl = get(datalabels, 'percent_label')

  //value label

  const vl = get(datalabels, 'value_label')

  if (
    get(datalabels, 'display') === true ||
    undefined === get(datalabels, 'display')
  ) {
    //max value

    const max = set_max_value(axes_data, 0)

    const pf = (value, context) => {
      if (tick_values.show_in == 'percent') {
        return value + '%'
      } else {
        const data = axes_data[context.dataIndex]
        const percent = Math.round((data / max) * 100 * 100) / 100
        return percent + '%'
      }
    }

    const vf = (value, context) => {
      if (tick_values.show_in == 'percent') {
        return axes_data[context.dataIndex]
      } else {
        return value
      }
    }

    var labels_data = [pl, vl]

    labels_data.forEach((data, index) => {
      var formatter = data === pl ? pf : vf
      var label_name = data === pl ? 'percent' : 'value'

      var label = {
        backgroundColor: get(data, 'backgroundColor')
          ? get(data, 'backgroundColor')
          : 'rgba(0,0,0,0)',
        borderColor: get(data, 'borderColor')
          ? get(data, 'borderColor')
          : 'rgba(0,0,0,0)',
        borderRadius: get(data, 'borderRadius')
          ? get(data, 'borderRadius')
          : '0',
        borderWidth: get(data, 'borderWidth') ? get(data, 'borderWidth') : '0',
        color: get(data, 'color') ? get(data, 'color') : '',
        font: get(data, 'font') ? get(data, 'font') : {},
        padding: get(data, 'padding') ? get(data, 'padding') : {},
        align: get(data, 'align')
          ? get(data, 'align')
          : data === pl
          ? 'end'
          : 'start',
        anchor: get(data, 'anchor')
          ? get(data, 'anchor')
          : data === pl
          ? 'start'
          : 'end',
        offset: get(data, 'offset')
          ? get(data, 'offset')
          : data === pl
          ? '0'
          : '4',
        formatter: formatter,
      }

      if (
        get(data, 'display_label') === true ||
        undefined === get(data, 'display_label')
      )
        set(
          chartOptions,
          'options.plugins.datalabels.labels.' + label_name,
          label
        )
    })
  } else {
    set(chartOptions, 'options.plugins.datalabels.display', false)
  }

  // Create chart

  console.log('Tangible chart', chartOptions)

  const chart = new Chart(context, chartOptions)

  // Hang it on DOMElement for convenience
  $el.data('chart', chart)

  return chart
}

$('.tangible-chart').tangibleChart()
