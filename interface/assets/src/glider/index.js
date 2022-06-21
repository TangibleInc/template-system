require('./glider')
require('./thumbnail')
//require('./zoom')

jQuery(function ($) {
  $('.tangible-glider').each(function () {
    $(this).tangibleGlider()
  })
})
