;(function ($, window, document, undefined) {
  'use strict'

  var defaults = {
    pager: false,
  }

  var Pager = function (element) {
    this.core = $(element).data('tangibleGlider')

    this.$el = $(element)
    this.core.s = $.extend({}, defaults, this.core.s)
    if (this.core.s.pager && this.core.$items.length > 1) {
      this.init()
    }

    return this
  }

  Pager.prototype.init = function () {
    var _this = this
    var pagerList = ''
    var $pagerCont
    var $pagerOuter
    var timeout

    _this.core.$outer
      .find('.lg')
      .append('<div class="tglider-pager-outer"></div>')

    if (_this.core.s.dynamic) {
      for (var i = 0; i < _this.core.s.dynamicEl.length; i++) {
        pagerList +=
          '<span class="tglider-pager-cont"> <span class="tglider-pager"></span><div class="tglider-pager-thumb-cont"><span class="tglider-caret"></span> <img src="' +
          _this.core.s.dynamicEl[i].thumb +
          '" /></div></span>'
      }
    } else {
      _this.core.$items.each(function () {
        if (!_this.core.s.exThumbImage) {
          pagerList +=
            '<span class="tglider-pager-cont"> <span class="tglider-pager"></span><div class="tglider-pager-thumb-cont"><span class="tglider-caret"></span> <img src="' +
            $(this).find('img').attr('src') +
            '" /></div></span>'
        } else {
          pagerList +=
            '<span class="tglider-pager-cont"> <span class="tglider-pager"></span><div class="tglider-pager-thumb-cont"><span class="tglider-caret"></span> <img src="' +
            $(this).attr(_this.core.s.exThumbImage) +
            '" /></div></span>'
        }
      })
    }

    $pagerOuter = _this.core.$outer.find('.tglider-pager-outer')

    $pagerOuter.html(pagerList)

    $pagerCont = _this.core.$outer.find('.tglider-pager-cont')
    $pagerCont.on('click.lg touchend.lg', function () {
      var _$this = $(this)
      _this.core.index = _$this.index()
      _this.core.slide(_this.core.index, false, false)
    })

    $pagerOuter.on('mouseover.lg', function () {
      clearTimeout(timeout)
      $pagerOuter.addClass('tglider-pager-hover')
    })

    $pagerOuter.on('mouseout.lg', function () {
      timeout = setTimeout(function () {
        $pagerOuter.removeClass('tglider-pager-hover')
      })
    })

    _this.core.$el.on('onBeforeSlide.lg.tm', function (e, prevIndex, index) {
      $pagerCont.removeClass('tglider-pager-active')
      $pagerCont.eq(index).addClass('tglider-pager-active')
    })
  }

  Pager.prototype.destroy = function () {}

  $.fn.tangibleGlider.modules.pager = Pager
})(jQuery, window, document)
