/**
 * Based on: https://github.com/sachinchoolur/lightslider
 *
 * Changed:
 *
 * - Refactor and modernize (in process)
 * - Remove dependency on image files
 *   Now using CSS background with URL data, but consider plain SVG for flexible styling
 */

const $ = jQuery

const defaults = {
  mode: 'slide',

  loop: true,
  speed: 800, // 400
  auto: false,
  pause: 5000, // 2000
  //pauseOnHover: true,

  item: 1, // 3
  thumbItem: 9,

  controls: true,
  pager: true,
  gallery: false,

  adaptiveHeight: false,
  enableDrag: true,

  autoWidth: false,
  slideMove: 1, // Will be 1 if loop is true
  slideMargin: 10,

  addClass: '',

  useCSS: true,
  cssEasing: '', // 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',
  easing: 'linear', // for jquery animation

  pauseOnHover: false,
  slideEndAnimation: true,

  keyPress: false,

  prevHtml: '',
  nextHtml: '',
  rtl: false,

  vertical: false,
  verticalHeight: 500,
  vThumbWidth: 100,

  galleryMargin: 5,
  thumbMargin: 5,
  currentPagerPosition: 'middle',
  enableTouch: true,

  freeMove: true,
  swipeThreshold: 40,
  responsive: [],

  onBeforeStart: function ($el) {},
  onSliderLoad: function ($el) {},
  onBeforeSlide: function ($el, scene) {},
  onAfterSlide: function ($el, scene) {},
  onBeforeNextSlide: function ($el, scene) {},
  onBeforePrevSlide: function ($el, scene) {},
}

const fadeModeDefaults = {
  mode: 'fade',

  speed: 1200,
  auto: true,
  enableDrag: false,
}

$.fn.tangibleSlider = function (options = {}) {
  if (this.length === 0) {
    return this
  }

  if (this.length > 1) {
    this.each(function () {
      $(this).tangibleSlider(options)
    })
    return this
  }

  if (this[0].tangibleSliderLoaded) return
  this[0].tangibleSliderLoaded = true

  // Support options from element's data attribtue

  let optionsFromElement = this.data('tangibleDynamicModuleOptions')

  if (optionsFromElement) {
    try {
      optionsFromElement = JSON.parse(optionsFromElement)
    } catch (e) {
      /* OK */
    }
  }
  if (
    optionsFromElement &&
    typeof optionsFromElement === 'object' &&
    !Array.isArray(optionsFromElement)
  ) {
    // Valid options
    Object.assign(options, optionsFromElement)
  }

  // Aliases

  const aliases = {
    drag: 'enableDrag',
  }

  for (const alias of Object.keys(aliases)) {
    if (typeof options[alias] === 'undefined') continue
    const key = aliases[alias]
    options[key] = options[alias]
    delete options[alias]
  }

  var plugin = {},
    settings = $.extend(true, {}, defaults, options),
    settingsTemp = {},
    $el = this

  plugin.$el = this

  if (settings.mode === 'fade') {
    settings.vertical = false
  }
  var $children = $el.children(),
    windowW = $(window).width(),
    breakpoint = null,
    resposiveObj = null,
    length = 0,
    w = 0,
    on = false,
    elSize = 0,
    $slide = '',
    scene = 0,
    property = settings.vertical === true ? 'height' : 'width',
    gutter = settings.vertical === true ? 'margin-bottom' : 'margin-right',
    slideValue = 0,
    pagerWidth = 0,
    slideWidth = 0,
    thumbWidth = 0,
    interval = null,
    isTouch = 'ontouchstart' in document.documentElement

  if ($children.length < 2) {
    // One or zero slides
    settings.controls = false
    settings.pager = false
    settings.loop = false
    settings.enableDrag = false
  }

  var refresh = {}

  refresh.chbreakpoint = function () {
    windowW = $(window).width()
    if (settings.responsive.length) {
      var item
      if (settings.autoWidth === false) {
        item = settings.item
      }
      if (windowW < settings.responsive[0].breakpoint) {
        for (var i = 0; i < settings.responsive.length; i++) {
          if (windowW < settings.responsive[i].breakpoint) {
            breakpoint = settings.responsive[i].breakpoint
            resposiveObj = settings.responsive[i]
          }
        }
      }
      if (typeof resposiveObj !== 'undefined' && resposiveObj !== null) {
        for (var j in resposiveObj.settings) {
          if (resposiveObj.settings.hasOwnProperty(j)) {
            if (
              typeof settingsTemp[j] === 'undefined' ||
              settingsTemp[j] === null
            ) {
              settingsTemp[j] = settings[j]
            }
            settings[j] = resposiveObj.settings[j]
          }
        }
      }
      if (
        !$.isEmptyObject(settingsTemp) &&
        windowW > settings.responsive[0].breakpoint
      ) {
        for (var k in settingsTemp) {
          if (settingsTemp.hasOwnProperty(k)) {
            settings[k] = settingsTemp[k]
          }
        }
      }
      if (settings.autoWidth === false) {
        if (slideValue > 0 && slideWidth > 0) {
          if (item !== settings.item) {
            scene = Math.round(
              slideValue /
                ((slideWidth + settings.slideMargin) * settings.slideMove)
            )
          }
        }
      }
    }
  }

  refresh.calSW = function () {
    if (settings.autoWidth === false) {
      slideWidth =
        (elSize -
          (settings.item * settings.slideMargin - settings.slideMargin)) /
        settings.item
    }
  }

  refresh.calWidth = function (cln) {
    var ln = cln === true ? $slide.find('.tslide').length : $children.length
    if (settings.autoWidth === false) {
      w = ln * (slideWidth + settings.slideMargin)
    } else {
      w = 0
      for (var i = 0; i < ln; i++) {
        w += parseInt($children.eq(i).width()) + settings.slideMargin
      }
    }
    return w
  }
  plugin = {
    doCss: function () {
      var support = function () {
        var transition = [
          'transition',
          'MozTransition',
          'WebkitTransition',
          'OTransition',
          'msTransition',
          'KhtmlTransition',
        ]
        var root = document.documentElement
        for (var i = 0; i < transition.length; i++) {
          if (transition[i] in root.style) {
            return true
          }
        }
      }
      if (settings.useCSS && support()) {
        return true
      }
      return false
    },
    keyPress: function () {
      if (settings.keyPress) {
        $(document).on('keyup.lightslider', function (e) {
          if (!$(':focus').is('input, textarea')) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
            if (e.keyCode === 37) {
              $el.goToPrevSlide()
            } else if (e.keyCode === 39) {
              $el.goToNextSlide()
            }
          }
        })
      }
    },
    controls: function () {
      if (!settings.controls) return
      $el.after(
        '<div class="tslider-action"><a class="tslider-prev">' +
          settings.prevHtml +
          '</a><a class="tslider-next">' +
          settings.nextHtml +
          '</a></div>'
      )
      if (!settings.autoWidth) {
        if (length <= settings.item) {
          $slide.find('.tslider-action').hide()
        }
      } else {
        if (refresh.calWidth(false) < elSize) {
          $slide.find('.tslider-action').hide()
        }
      }
      $slide.find('.tslider-action a').on('click', function (e) {
        if (e.preventDefault) {
          e.preventDefault()
        } else {
          e.returnValue = false
        }
        if ($(this).attr('class') === 'tslider-prev') {
          $el.goToPrevSlide()
        } else {
          $el.goToNextSlide()
        }
        return false
      })
    },
    initialStyle: function () {
      var $this = this
      if (settings.mode === 'fade') {
        settings.autoWidth = false
        settings.slideEndAnimation = false
      }
      if (settings.auto) {
        settings.slideEndAnimation = false
      }
      if (settings.autoWidth) {
        settings.slideMove = 1
        settings.item = 1
      }
      if (settings.loop) {
        settings.slideMove = 1
        settings.freeMove = false
      }
      settings.onBeforeStart.call(this, $el)
      refresh.chbreakpoint()
      $el
        .addClass('tslider')
        .wrap(
          '<div class="tslide-outer ' +
            settings.addClass +
            '"><div class="tslide-wrapper"></div></div>'
        )
      $slide = $el.parent('.tslide-wrapper')
      if (settings.rtl === true) {
        $slide.parent().addClass('tslider-rtl')
      }
      if (settings.vertical) {
        $slide.parent().addClass('vertical')
        elSize = settings.verticalHeight
        $slide.css('height', elSize + 'px')
      } else {
        elSize = $el.outerWidth()
      }
      $children.addClass('tslide')
      if (settings.loop === true && settings.mode === 'slide') {
        refresh.calSW()
        refresh.clone = function () {
          if (refresh.calWidth(true) > elSize) {
            /**/
            var tWr = 0,
              tI = 0
            for (var k = 0; k < $children.length; k++) {
              tWr +=
                parseInt($el.find('.tslide').eq(k).width()) +
                settings.slideMargin
              tI++
              if (tWr >= elSize + settings.slideMargin) {
                break
              }
            }
            var tItem = settings.autoWidth === true ? tI : settings.item

            /**/
            if (tItem < $el.find('.clone.left').length) {
              for (var i = 0; i < $el.find('.clone.left').length - tItem; i++) {
                $children.eq(i).remove()
              }
            }
            if (tItem < $el.find('.clone.right').length) {
              for (
                var j = $children.length - 1;
                j > $children.length - 1 - $el.find('.clone.right').length;
                j--
              ) {
                scene--
                $children.eq(j).remove()
              }
            }
            /**/
            for (var n = $el.find('.clone.right').length; n < tItem; n++) {
              $el
                .find('.tslide')
                .eq(n)
                .clone()
                .removeClass('tslide')
                .addClass('clone right')
                .appendTo($el)
              scene++
            }
            for (
              var m =
                $el.find('.tslide').length - $el.find('.clone.left').length;
              m > $el.find('.tslide').length - tItem;
              m--
            ) {
              $el
                .find('.tslide')
                .eq(m - 1)
                .clone()
                .removeClass('tslide')
                .addClass('clone left')
                .prependTo($el)
            }
            $children = $el.children()
          } else {
            if ($children.hasClass('clone')) {
              $el.find('.clone').remove()
              $this.move($el, 0)
            }
          }
        }
        refresh.clone()
      }
      refresh.sSW = function () {
        length = $children.length
        if (settings.rtl === true && settings.vertical === false) {
          gutter = 'margin-left'
        }
        if (settings.autoWidth === false) {
          $children.css(property, slideWidth + 'px')
        }
        $children.css(gutter, settings.slideMargin + 'px')
        w = refresh.calWidth(false)
        $el.css(property, w + 'px')
        if (settings.loop === true && settings.mode === 'slide') {
          if (on === false) {
            scene = $el.find('.clone.left').length
          }
        }
      }
      refresh.calL = function () {
        $children = $el.children()
        length = $children.length
      }
      if (this.doCss()) {
        $slide.addClass('usingCss')
      }
      refresh.calL()
      if (settings.mode === 'slide') {
        refresh.calSW()
        refresh.sSW()
        if (settings.loop === true) {
          slideValue = $this.slideValue()
          this.move($el, slideValue)
        }
        if (settings.vertical === false) {
          this.setHeight($el, false)
        }
      } else {
        this.setHeight($el, true)
        $el.addClass('tslider-fade')
        if (!this.doCss()) {
          $children.fadeOut(0)
          $children.eq(scene).fadeIn(0)
        }
      }
      if (settings.loop === true && settings.mode === 'slide') {
        $children.eq(scene).addClass('active')
      } else {
        $children.first().addClass('active')
      }
    },
    pager: function () {
      var $this = this
      refresh.createPager = function () {
        thumbWidth =
          (elSize -
            (settings.thumbItem * settings.thumbMargin -
              settings.thumbMargin)) /
          settings.thumbItem
        var $children = $slide.find('.tslide')
        var length = $slide.find('.tslide').length
        var i = 0,
          pagers = '',
          v = 0
        for (i = 0; i < length; i++) {
          if (settings.mode === 'slide') {
            // calculate scene * slide value
            if (!settings.autoWidth) {
              v = i * ((slideWidth + settings.slideMargin) * settings.slideMove)
            } else {
              v +=
                (parseInt($children.eq(i).width()) + settings.slideMargin) *
                settings.slideMove
            }
          }
          var thumb = $children.eq(i * settings.slideMove).attr('data-thumb')
          if (settings.gallery === true) {
            pagers +=
              '<li style="width:100%;' +
              property +
              ':' +
              thumbWidth +
              'px;' +
              gutter +
              ':' +
              settings.thumbMargin +
              'px"><a href="#"><img src="' +
              thumb +
              '" /></a></li>'
          } else {
            pagers += '<li><a href="#">' + (i + 1) + '</a></li>'
          }
          if (settings.mode === 'slide') {
            if (v >= w - elSize - settings.slideMargin) {
              i = i + 1
              var minPgr = 2
              if (settings.autoWidth) {
                pagers += '<li><a href="#">' + (i + 1) + '</a></li>'
                minPgr = 1
              }
              if (i < minPgr) {
                pagers = null
                $slide.parent().addClass('noPager')
              } else {
                $slide.parent().removeClass('noPager')
              }
              break
            }
          }
        }
        var $cSouter = $slide.parent()
        $cSouter.find('.tslider-pager').html(pagers)
        if (settings.gallery === true) {
          if (settings.vertical === true) {
            // set Gallery thumbnail width
            $cSouter
              .find('.tslider-pager')
              .css('width', settings.vThumbWidth + 'px')
          }
          pagerWidth = i * (settings.thumbMargin + thumbWidth) + 0.5
          $cSouter.find('.tslider-pager').css({
            property: pagerWidth + 'px',
            'transition-duration': settings.speed + 'ms',
          })
          if (settings.vertical === true) {
            $slide
              .parent()
              .css(
                'padding-right',
                settings.vThumbWidth + settings.galleryMargin + 'px'
              )
          }
          $cSouter.find('.tslider-pager').css(property, pagerWidth + 'px')
        }
        var $pager = $cSouter.find('.tslider-pager').find('li')
        $pager.first().addClass('active')
        $pager.on('click', function () {
          if (settings.loop === true && settings.mode === 'slide') {
            scene =
              scene +
              ($pager.index(this) -
                $cSouter.find('.tslider-pager').find('li.active').index())
          } else {
            scene = $pager.index(this)
          }
          $el.mode(false)
          if (settings.gallery === true) {
            $this.slideThumb()
          }
          return false
        })
      }
      if (settings.pager) {
        var cl = 'tslider-pager'
        if (settings.gallery) {
          cl = 'tslider-gallery'
        }
        $slide.after('<ul class="tslider-pager ' + cl + '"></ul>')
        var gMargin = settings.vertical ? 'margin-left' : 'margin-top'
        $slide
          .parent()
          .find('.tslider-pager')
          .css(gMargin, settings.galleryMargin + 'px')
        refresh.createPager()
      }

      setTimeout(function () {
        refresh.init()
      }, 0)
    },
    setHeight: function (ob, fade) {
      var obj = null,
        $this = this
      if (settings.loop) {
        obj = ob.children('.tslide ').first()
      } else {
        obj = ob.children().first()
      }
      var setCss = function () {
        var tH = obj.outerHeight(),
          tP = 0,
          tHT = tH
        if (fade) {
          tH = 0
          tP = (tHT * 100) / elSize
        }
        ob.css({
          height: tH + 'px',
          'padding-bottom': tP + '%',
        })
      }
      setCss()
      if (obj.find('img').length) {
        if (obj.find('img')[0].complete) {
          setCss()
          if (!interval) {
            $this.auto()
          }
        } else {
          obj.find('img').on('load', function () {
            setTimeout(function () {
              setCss()
              if (!interval) {
                $this.auto()
              }
            }, 100)
          })
        }
      } else {
        if (!interval) {
          $this.auto()
        }
      }
    },
    active: function (ob, t) {
      if (this.doCss() && settings.mode === 'fade') {
        $slide.addClass('on')
      }
      var sc = 0
      if (scene * settings.slideMove < length) {
        ob.removeClass('active')
        if (!this.doCss() && settings.mode === 'fade' && t === false) {
          ob.fadeOut(settings.speed)
        }
        if (t === true) {
          sc = scene
        } else {
          sc = scene * settings.slideMove
        }
        //t === true ? sc = scene : sc = scene * settings.slideMove;
        var l, nl
        if (t === true) {
          l = ob.length
          nl = l - 1
          if (sc + 1 >= l) {
            sc = nl
          }
        }
        if (settings.loop === true && settings.mode === 'slide') {
          //t === true ? sc = scene - $el.find('.clone.left').length : sc = scene * settings.slideMove;
          if (t === true) {
            sc = scene - $el.find('.clone.left').length
          } else {
            sc = scene * settings.slideMove
          }
          if (t === true) {
            l = ob.length
            nl = l - 1
            if (sc + 1 === l) {
              sc = nl
            } else if (sc + 1 > l) {
              sc = 0
            }
          }
        }

        if (!this.doCss() && settings.mode === 'fade' && t === false) {
          ob.eq(sc).fadeIn(settings.speed)
        }
        ob.eq(sc).addClass('active')
      } else {
        ob.removeClass('active')
        ob.eq(ob.length - 1).addClass('active')
        if (!this.doCss() && settings.mode === 'fade' && t === false) {
          ob.fadeOut(settings.speed)
          ob.eq(sc).fadeIn(settings.speed)
        }
      }
    },
    move: function (ob, v) {
      if (settings.rtl === true) {
        v = -v
      }
      //var self = this
      //window.requestAnimationFrame(function() {
      if (this.doCss()) {
        if (settings.vertical === true) {
          ob.css({
            transform: 'translate3d(0px, ' + -v + 'px, 0px)',
            '-webkit-transform': 'translate3d(0px, ' + -v + 'px, 0px)',
          })
        } else {
          //console.log(-v)
          ob.css({
            // 'transform': 'translateX(' + (-v) + 'px)',//, 0px, 0px)',
            // '-webkit-transform': 'translateX(' + (-v) + 'px)', //, 0px, 0px)',
            transform: 'translate3d(' + -v + 'px, 0px, 0px)',
            '-webkit-transform': 'translate3d(' + -v + 'px, 0px, 0px)',
          })
        }
      } else {
        if (settings.vertical === true) {
          ob.css('position', 'relative').animate(
            {
              top: -v + 'px',
            },
            settings.speed,
            settings.easing
          )
        } else {
          ob.css('position', 'relative').animate(
            {
              left: -v + 'px',
            },
            settings.speed,
            settings.easing
          )
        }
      }

      //})

      var $thumb = $slide.parent().find('.tslider-pager').find('li')
      this.active($thumb, true)
    },
    fade: function () {
      this.active($children, false)
      var $thumb = $slide.parent().find('.tslider-pager').find('li')
      this.active($thumb, true)
    },
    slide: function () {
      var $this = this
      refresh.calSlide = function () {
        if (w > elSize) {
          slideValue = $this.slideValue()
          $this.active($children, false)
          if (slideValue > w - elSize - settings.slideMargin) {
            slideValue = w - elSize - settings.slideMargin
          } else if (slideValue < 0) {
            slideValue = 0
          }
          $this.move($el, slideValue)
          if (settings.loop === true && settings.mode === 'slide') {
            if (
              scene >=
              length - $el.find('.clone.left').length / settings.slideMove
            ) {
              $this.resetSlide($el.find('.clone.left').length)
            }
            if (scene === 0) {
              $this.resetSlide($slide.find('.tslide').length)
            }
          }
        }
      }
      refresh.calSlide()
    },
    resetSlide: function (s) {
      var $this = this
      $slide.find('.tslider-action a').addClass('disabled')
      setTimeout(function () {
        scene = s
        $slide.css('transition-duration', '0ms')
        slideValue = $this.slideValue()
        $this.active($children, false)
        plugin.move($el, slideValue)
        setTimeout(function () {
          $slide.css('transition-duration', settings.speed + 'ms')
          $slide.find('.tslider-action a').removeClass('disabled')
        }, 50)
      }, settings.speed + 100)
    },
    slideValue: function () {
      var _sV = 0
      if (settings.autoWidth === false) {
        _sV = scene * ((slideWidth + settings.slideMargin) * settings.slideMove)
      } else {
        _sV = 0
        for (var i = 0; i < scene; i++) {
          _sV += parseInt($children.eq(i).width()) + settings.slideMargin
        }
      }
      return _sV
    },
    slideThumb: function () {
      var position
      switch (settings.currentPagerPosition) {
        case 'left':
          position = 0
          break
        case 'middle':
          position = elSize / 2 - thumbWidth / 2
          break
        case 'right':
          position = elSize - thumbWidth
      }
      var sc = scene - $el.find('.clone.left').length
      var $pager = $slide.parent().find('.tslider-pager')
      if (settings.mode === 'slide' && settings.loop === true) {
        if (sc >= $pager.children().length) {
          sc = 0
        } else if (sc < 0) {
          sc = $pager.children().length
        }
      }
      var thumbSlide = sc * (thumbWidth + settings.thumbMargin) - position
      if (thumbSlide + elSize > pagerWidth) {
        thumbSlide = pagerWidth - elSize - settings.thumbMargin
      }
      if (thumbSlide < 0) {
        thumbSlide = 0
      }
      this.move($pager, thumbSlide)
    },
    auto: function () {
      if (settings.auto) {
        clearInterval(interval)
        interval = setInterval(function () {
          $el.goToNextSlide()
        }, settings.pause)
      }
    },
    pauseOnHover: function () {
      var $this = this
      if (settings.auto && settings.pauseOnHover) {
        $slide.on('mouseenter', function () {
          $(this).addClass('ls-hover')
          $el.pause()
          settings.auto = true
        })
        $slide.on('mouseleave', function () {
          $(this).removeClass('ls-hover')
          if (!$slide.find('.tslider').hasClass('tslider-grabbing')) {
            $this.auto()
          }
        })
      }
    },
    touchMove: function (endCoords, startCoords) {
      $slide.css('transition-duration', '0ms')
      if (settings.mode === 'slide') {
        var distance = endCoords - startCoords
        var swipeVal = slideValue - distance
        if (swipeVal >= w - elSize - settings.slideMargin) {
          if (settings.freeMove === false) {
            swipeVal = w - elSize - settings.slideMargin
          } else {
            var swipeValT = w - elSize - settings.slideMargin
            swipeVal = swipeValT + (swipeVal - swipeValT) / 5
          }
        } else if (swipeVal < 0) {
          if (settings.freeMove === false) {
            swipeVal = 0
          } else {
            swipeVal = swipeVal / 5
          }
        }
        this.move($el, swipeVal)
      }
    },

    touchEnd: function (distance) {
      $slide.css('transition-duration', settings.speed + 'ms')
      if (settings.mode === 'slide') {
        var mxVal = false
        var _next = true
        slideValue = slideValue - distance
        if (slideValue > w - elSize - settings.slideMargin) {
          slideValue = w - elSize - settings.slideMargin
          if (settings.autoWidth === false) {
            mxVal = true
          }
        } else if (slideValue < 0) {
          slideValue = 0
        }
        var gC = function (next) {
          var ad = 0
          if (!mxVal) {
            if (next) {
              ad = 1
            }
          }
          if (!settings.autoWidth) {
            var num =
              slideValue /
              ((slideWidth + settings.slideMargin) * settings.slideMove)
            scene = parseInt(num) + ad
            if (slideValue >= w - elSize - settings.slideMargin) {
              if (num % 1 !== 0) {
                scene++
              }
            }
          } else {
            var tW = 0
            for (var i = 0; i < $children.length; i++) {
              tW += parseInt($children.eq(i).width()) + settings.slideMargin
              scene = i + ad
              if (tW >= slideValue) {
                break
              }
            }
          }
        }
        if (distance >= settings.swipeThreshold) {
          gC(false)
          _next = false
        } else if (distance <= -settings.swipeThreshold) {
          gC(true)
          _next = false
        }
        $el.mode(_next)
        this.slideThumb()
      } else {
        if (distance >= settings.swipeThreshold) {
          $el.goToPrevSlide()
        } else if (distance <= -settings.swipeThreshold) {
          $el.goToNextSlide()
        }
      }
    },

    enableDrag: function () {
      var $this = this
      if (!isTouch) {
        var startCoords = 0,
          endCoords = 0,
          isDraging = false
        $slide.find('.tslider').addClass('tslider-grab')
        $slide.on('mousedown', function (e) {
          if (w < elSize) {
            if (w !== 0) {
              return false
            }
          }
          if (
            $(e.target).attr('class') !== 'tslider-prev' &&
            $(e.target).attr('class') !== 'tslider-next'
          ) {
            startCoords = settings.vertical === true ? e.pageY : e.pageX
            isDraging = true
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
            // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
            $slide.scrollLeft += 1
            $slide.scrollLeft -= 1
            // *
            $slide
              .find('.tslider')
              .removeClass('tslider-grab')
              .addClass('tslider-grabbing')
            clearInterval(interval)
          }
        })
        $(window).on('mousemove', function (e) {
          if (isDraging) {
            endCoords = settings.vertical === true ? e.pageY : e.pageX
            $this.touchMove(endCoords, startCoords)
          }
        })
        $(window).on('mouseup', function (e) {
          if (isDraging) {
            $slide
              .find('.tslider')
              .removeClass('tslider-grabbing')
              .addClass('tslider-grab')
            isDraging = false
            endCoords = settings.vertical === true ? e.pageY : e.pageX
            var distance = endCoords - startCoords
            if (Math.abs(distance) >= settings.swipeThreshold) {
              $(window).on('click.ls', function (e) {
                if (e.preventDefault) {
                  e.preventDefault()
                } else {
                  e.returnValue = false
                }
                e.stopImmediatePropagation()
                e.stopPropagation()
                $(window).off('click.ls')
              })
            }

            $this.touchEnd(distance)
          }
        })
      }
    },

    enableTouch: function () {
      var $this = this
      if (isTouch) {
        var startCoords = {},
          endCoords = {}
        $slide.on('touchstart', function (e) {
          endCoords = e.originalEvent.targetTouches[0]
          startCoords.pageX = e.originalEvent.targetTouches[0].pageX
          startCoords.pageY = e.originalEvent.targetTouches[0].pageY
          clearInterval(interval)
        })
        $slide.on('touchmove', function (e) {
          if (w < elSize) {
            if (w !== 0) {
              return false
            }
          }
          var orig = e.originalEvent
          endCoords = orig.targetTouches[0]
          var xMovement = Math.abs(endCoords.pageX - startCoords.pageX)
          var yMovement = Math.abs(endCoords.pageY - startCoords.pageY)
          if (settings.vertical === true) {
            if (yMovement * 3 > xMovement) {
              e.preventDefault()
            }
            $this.touchMove(endCoords.pageY, startCoords.pageY)
          } else {
            if (xMovement * 3 > yMovement) {
              e.preventDefault()
            }
            $this.touchMove(endCoords.pageX, startCoords.pageX)
          }
        })
        $slide.on('touchend', function () {
          if (w < elSize) {
            if (w !== 0) {
              return false
            }
          }
          var distance
          if (settings.vertical === true) {
            distance = endCoords.pageY - startCoords.pageY
          } else {
            distance = endCoords.pageX - startCoords.pageX
          }
          $this.touchEnd(distance)
        })
      }
    },
    build: function () {
      var $this = this
      $this.initialStyle()
      if (this.doCss()) {
        if (settings.enableTouch === true) {
          $this.enableTouch()
        }
        if (settings.enableDrag === true) {
          $this.enableDrag()
        }
      }

      $(window).on('focus', function () {
        $this.auto()
      })

      $(window).on('blur', function () {
        clearInterval(interval)
      })

      $this.pager()
      $this.pauseOnHover()
      $this.controls()
      $this.keyPress()
    },
  }

  plugin.build()

  refresh.init = function () {
    refresh.chbreakpoint()
    if (settings.vertical === true) {
      if (settings.item > 1) {
        elSize = settings.verticalHeight
      } else {
        elSize = $children.outerHeight()
      }
      $slide.css('height', elSize + 'px')
    } else {
      elSize = $slide.outerWidth()
    }
    if (settings.loop === true && settings.mode === 'slide') {
      refresh.clone()
    }
    refresh.calL()
    if (settings.mode === 'slide') {
      $el.removeClass('tslide-animate')
    }
    if (settings.mode === 'slide') {
      refresh.calSW()
      refresh.sSW()
    }
    setTimeout(function () {
      if (settings.mode === 'slide') {
        $el.addClass('tslide-animate')
      }
    }, 1000)
    if (settings.pager) {
      refresh.createPager()
    }
    if (settings.adaptiveHeight === true && settings.vertical === false) {
      $el.css('height', $children.eq(scene).outerHeight(true))
    }
    if (settings.adaptiveHeight === false) {
      if (settings.mode === 'slide') {
        if (settings.vertical === false) {
          plugin.setHeight($el, false)
        } else {
          plugin.auto()
        }
      } else {
        plugin.setHeight($el, true)
      }
    }
    if (settings.gallery === true) {
      plugin.slideThumb()
    }
    if (settings.mode === 'slide') {
      plugin.slide()
    }
    if (settings.autoWidth === false) {
      if ($children.length <= settings.item) {
        $slide.find('.tslider-action').hide()
      } else {
        $slide.find('.tslider-action').show()
      }
    } else {
      if (refresh.calWidth(false) < elSize && w !== 0) {
        $slide.find('.tslider-action').hide()
      } else {
        $slide.find('.tslider-action').show()
      }
    }
  }

  $el.goToPrevSlide = function () {
    if (scene > 0) {
      settings.onBeforePrevSlide.call(this, $el, scene)
      scene--
      $el.mode(false)
      if (settings.gallery === true) {
        plugin.slideThumb()
      }
    } else {
      if (settings.loop === true) {
        settings.onBeforePrevSlide.call(this, $el, scene)
        if (settings.mode === 'fade') {
          var l = length - 1
          scene = parseInt(l / settings.slideMove)
        }
        $el.mode(false)
        if (settings.gallery === true) {
          plugin.slideThumb()
        }
      } else if (settings.slideEndAnimation === true) {
        $el.addClass('leftEnd')
        setTimeout(function () {
          $el.removeClass('leftEnd')
        }, 400)
      }
    }
  }

  $el.goToNextSlide = function () {
    var nextI = true
    if (settings.mode === 'slide') {
      var _slideValue = plugin.slideValue()
      nextI = _slideValue < w - elSize - settings.slideMargin
    }
    if (scene * settings.slideMove < length - settings.slideMove && nextI) {
      settings.onBeforeNextSlide.call(this, $el, scene)
      scene++
      $el.mode(false)
      if (settings.gallery === true) {
        plugin.slideThumb()
      }
    } else {
      if (settings.loop === true) {
        settings.onBeforeNextSlide.call(this, $el, scene)
        scene = 0
        $el.mode(false)
        if (settings.gallery === true) {
          plugin.slideThumb()
        }
      } else if (settings.slideEndAnimation === true) {
        $el.addClass('rightEnd')
        setTimeout(function () {
          $el.removeClass('rightEnd')
        }, 400)
      }
    }
  }

  $el.mode = function (_touch) {
    if (settings.adaptiveHeight === true && settings.vertical === false) {
      $el.css('height', $children.eq(scene).outerHeight(true))
    }
    if (on === false) {
      if (settings.mode === 'slide') {
        if (plugin.doCss()) {
          $el.addClass('tslide-animate')
          if (settings.speed !== '') {
            $slide.css('transition-duration', settings.speed + 'ms')
          }
          if (settings.cssEasing !== '') {
            $slide.css('transition-timing-function', settings.cssEasing)
          }
        }
      } else {
        if (plugin.doCss()) {
          if (settings.speed !== '') {
            $el.css('transition-duration', settings.speed + 'ms')
          }
          if (settings.cssEasing !== '') {
            $el.css('transition-timing-function', settings.cssEasing)
          }
        }
      }
    }
    if (!_touch) {
      settings.onBeforeSlide.call(this, $el, scene)
    }
    if (settings.mode === 'slide') {
      plugin.slide()
    } else {
      plugin.fade()
    }
    if (!$slide.hasClass('ls-hover')) {
      plugin.auto()
    }
    setTimeout(function () {
      if (!_touch) {
        settings.onAfterSlide.call(this, $el, scene)
      }
    }, settings.speed)
    on = true
  }
  $el.play = function () {
    $el.goToNextSlide()
    settings.auto = true
    plugin.auto()
  }
  $el.pause = function () {
    settings.auto = false
    clearInterval(interval)
  }
  $el.refresh = function () {
    refresh.init()
  }
  $el.getCurrentSlideCount = function () {
    var sc = scene
    if (settings.loop) {
      var ln = $slide.find('.tslide').length,
        cl = $el.find('.clone.left').length
      if (scene <= cl - 1) {
        sc = ln + (scene - cl)
      } else if (scene >= ln + cl) {
        sc = scene - ln - cl
      } else {
        sc = scene - cl
      }
    }
    return sc + 1
  }
  $el.getTotalSlideCount = function () {
    return $slide.find('.tslide').length
  }
  $el.goToSlide = function (s) {
    if (settings.loop) {
      scene = s + $el.find('.clone.left').length - 1
    } else {
      scene = s
    }
    $el.mode(false)
    if (settings.gallery === true) {
      plugin.slideThumb()
    }
  }
  $el.destroy = function () {
    if ($el.tangibleSlider) {
      $el.goToPrevSlide = function () {}
      $el.goToNextSlide = function () {}
      $el.mode = function () {}
      $el.play = function () {}
      $el.pause = function () {}
      $el.refresh = function () {}
      $el.getCurrentSlideCount = function () {}
      $el.getTotalSlideCount = function () {}
      $el.goToSlide = function () {}
      $el.tangibleSlider = null
      refresh = {
        init: function () {},
      }
      $el.parent().parent().find('.tslider-action, .tslider-pager').remove()
      $el
        .removeClass(
          'tslider tslider-fade tslide-animate tslider-grab tslider-grabbing leftEnd right'
        )
        .removeAttr('style')
        .unwrap()
        .unwrap()
      $el.children().removeAttr('style')
      $children.removeClass('tslide active')
      $el.find('.clone').remove()
      $children = null
      interval = null
      on = false
      scene = 0
    }
  }
  setTimeout(function () {
    settings.onSliderLoad.call(this, $el)

    $el.addClass('loaded')
  }, 10)
  $(window).on('resize orientationchange', function (e) {
    setTimeout(function () {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        e.returnValue = false
      }
      refresh.init()
    }, 200)
  })
  return this
}

$(document).ready(function () {
  $('.tangible-slider').each(function () {
    $(this).tangibleSlider()
  })
})
