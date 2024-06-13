import './glider'
import './thumbnail'
//import './zoom'

jQuery(function ($) {
  $('.tangible-glider').each(function () {
    console.log(this)
    $(this).tangibleGlider()
  })
})
