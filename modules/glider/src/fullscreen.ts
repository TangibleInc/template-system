;(function ($, window, document, undefined) {
  'use strict'

  var defaults = {
    fullScreen: true,
  }

  var Fullscreen = function (element) {
    // get tangibleGlider core plugin data
    this.core = $(element).data('tangibleGlider')

    this.$el = $(element)

    // extend module defalut settings with tangibleGlider core settings
    this.core.s = $.extend({}, defaults, this.core.s)

    this.init()

    return this
  }

  Fullscreen.prototype.init = function () {
    var fullScreen = ''
    if (this.core.s.fullScreen) {
      // check for fullscreen browser support
      if (
        !document.fullscreenEnabled &&
        !document.webkitFullscreenEnabled &&
        !document.mozFullScreenEnabled &&
        !document.msFullscreenEnabled
      ) {
        return
      } else {
        fullScreen = '<span class="tglider-fullscreen tglider-icon"></span>'
        this.core.$outer.find('.tglider-toolbar').append(fullScreen)
        this.fullScreen()
      }
    }
  }

  Fullscreen.prototype.requestFullscreen = function () {
    var el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    }
  }

  Fullscreen.prototype.exitFullscreen = function () {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
  Fullscreen.prototype.fullScreen = function () {
    var _this = this

    $(document).on(
      'fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg',
      function () {
        _this.core.$outer.toggleClass('tglider-fullscreen-on')
      }
    )

    this.core.$outer.find('.tglider-fullscreen').on('click.lg', function () {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        _this.requestFullscreen()
      } else {
        _this.exitFullscreen()
      }
    })
  }

  Fullscreen.prototype.destroy = function () {
    // exit from fullscreen if activated
    this.exitFullscreen()

    $(document).off(
      'fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg'
    )
  }

  $.fn.tangibleGlider.modules.fullscreen = Fullscreen
})(jQuery, window, document)
