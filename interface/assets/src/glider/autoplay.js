/**
 * Autoplay Plugin
 * @version 1.2.0
 * @author Sachin N - @sachinchoolur
 * @license MIT License (MIT)
 */

;(function ($, window, document, undefined) {
  'use strict'

  var defaults = {
    autoplay: false,
    pause: 5000,
    progressBar: true,
    fourceAutoplay: false,
    autoplayControls: true,
    appendAutoplayControlsTo: '.tglider-toolbar',
  }

  /**
   * Creates the autoplay plugin.
   * @param {object} element - tangibleGlider element
   */
  var Autoplay = function (element) {
    this.core = $(element).data('tangibleGlider')

    this.$el = $(element)

    // Execute only if items are above 1
    if (this.core.$items.length < 2) {
      return false
    }

    this.core.s = $.extend({}, defaults, this.core.s)
    this.interval = false

    // Identify if slide happened from autoplay
    this.fromAuto = true

    // Identify if autoplay canceled from touch/drag
    this.canceledOnTouch = false

    // save fourceautoplay value
    this.fourceAutoplayTemp = this.core.s.fourceAutoplay

    // do not allow progress bar if browser does not support css3 transitions
    if (!this.core.doCss()) {
      this.core.s.progressBar = false
    }

    this.init()

    return this
  }

  Autoplay.prototype.init = function () {
    var _this = this

    // append autoplay controls
    if (_this.core.s.autoplayControls) {
      _this.controls()
    }

    // Create progress bar
    if (_this.core.s.progressBar) {
      _this.core.$outer
        .find('.lg')
        .append(
          '<div class="tglider-progress-bar"><div class="tglider-progress"></div></div>'
        )
    }

    // set progress
    _this.progress()

    // Start autoplay
    if (_this.core.s.autoplay) {
      _this.startlAuto()
    }

    // cancel interval on touchstart and dragstart
    _this.$el.on('onDragstart.lg.tm touchstart.lg.tm', function () {
      if (_this.interval) {
        _this.cancelAuto()
        _this.canceledOnTouch = true
      }
    })

    // restore autoplay if autoplay canceled from touchstart / dragstart
    _this.$el.on(
      'onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm',
      function () {
        if (!_this.interval && _this.canceledOnTouch) {
          _this.startlAuto()
          _this.canceledOnTouch = false
        }
      }
    )
  }

  Autoplay.prototype.progress = function () {
    var _this = this
    var _$progressBar
    var _$progress

    _this.$el.on('onBeforeSlide.lg.tm', function () {
      // start progress bar animation
      if (_this.core.s.progressBar && _this.fromAuto) {
        _$progressBar = _this.core.$outer.find('.tglider-progress-bar')
        _$progress = _this.core.$outer.find('.tglider-progress')
        if (_this.interval) {
          _$progress.removeAttr('style')
          _$progressBar.removeClass('tglider-start')
          setTimeout(function () {
            _$progress.css(
              'transition',
              'width ' +
                (_this.core.s.speed + _this.core.s.pause) +
                'ms ease 0s'
            )
            _$progressBar.addClass('tglider-start')
          }, 20)
        }
      }

      // Remove setinterval if slide is triggered manually and fourceautoplay is false
      if (!_this.fromAuto && !_this.core.s.fourceAutoplay) {
        _this.cancelAuto()
      }

      _this.fromAuto = false
    })
  }

  // Manage autoplay via play/stop buttons
  Autoplay.prototype.controls = function () {
    var _this = this
    var _html = '<span class="tglider-autoplay-button tglider-icon"></span>'

    // Append autoplay controls
    $(this.core.s.appendAutoplayControlsTo).append(_html)

    _this.core.$outer
      .find('.tglider-autoplay-button')
      .on('click.lg', function () {
        if ($(_this.core.$outer).hasClass('tglider-show-autoplay')) {
          _this.cancelAuto()
          _this.core.s.fourceAutoplay = false
        } else {
          if (!_this.interval) {
            _this.startlAuto()
            _this.core.s.fourceAutoplay = _this.fourceAutoplayTemp
          }
        }
      })
  }

  // Autostart gallery
  Autoplay.prototype.startlAuto = function () {
    var _this = this

    _this.core.$outer
      .find('.tglider-progress')
      .css(
        'transition',
        'width ' + (_this.core.s.speed + _this.core.s.pause) + 'ms ease 0s'
      )
    _this.core.$outer.addClass('tglider-show-autoplay')
    _this.core.$outer.find('.tglider-progress-bar').addClass('tglider-start')

    _this.interval = setInterval(function () {
      if (_this.core.index + 1 < _this.core.$items.length) {
        _this.core.index = _this.core.index
      } else {
        _this.core.index = -1
      }

      _this.core.index++
      _this.fromAuto = true
      _this.core.slide(_this.core.index, false, false)
    }, _this.core.s.speed + _this.core.s.pause)
  }

  // cancel Autostart
  Autoplay.prototype.cancelAuto = function () {
    clearInterval(this.interval)
    this.interval = false
    this.core.$outer.find('.tglider-progress').removeAttr('style')
    this.core.$outer.removeClass('tglider-show-autoplay')
    this.core.$outer.find('.tglider-progress-bar').removeClass('tglider-start')
  }

  Autoplay.prototype.destroy = function () {
    this.cancelAuto()
    this.core.$outer.find('.tglider-progress-bar').remove()
  }

  $.fn.tangibleGlider.modules.autoplay = Autoplay
})(jQuery, window, document)
