;(function ($, window, document, undefined) {
  'use strict'

  var defaults = {
    videoMaxWidth: '855px',
    youtubePlayerParams: false,
    vimeoPlayerParams: false,
    dailymotionPlayerParams: false,
    vkPlayerParams: false,
    videojs: false,
    videojsOptions: {},
  }

  var Video = function (element) {
    this.core = $(element).data('tangibleGlider')

    this.$el = $(element)
    this.core.s = $.extend({}, defaults, this.core.s)
    this.videoLoaded = false

    this.init()

    return this
  }

  Video.prototype.init = function () {
    var _this = this

    // Event triggered when video url found without poster
    _this.core.$el.on('hasVideo.lg.tm', function (event, index, src, html) {
      _this.core.$slide
        .eq(index)
        .find('.tglider-video')
        .append(_this.loadVideo(src, 'tglider-object', true, index, html))
      if (html) {
        if (_this.core.s.videojs) {
          try {
            videojs(
              _this.core.$slide.eq(index).find('.tglider-html5').get(0),
              _this.core.s.videojsOptions,
              function () {
                if (!_this.videoLoaded) {
                  this.play()
                }
              }
            )
          } catch (e) {
            console.error('Make sure you have included videojs')
          }
        } else {
          _this.core.$slide.eq(index).find('.tglider-html5').get(0).play()
        }
      }
    })

    // Set max width for video
    _this.core.$el.on('onAferAppendSlide.lg.tm', function (event, index) {
      _this.core.$slide
        .eq(index)
        .find('.tglider-video-cont')
        .css('max-width', _this.core.s.videoMaxWidth)
      _this.videoLoaded = true
    })

    var loadOnClick = function ($el) {
      // check slide has poster
      if (
        $el.find('.tglider-object').hasClass('tglider-has-poster') &&
        $el.find('.tglider-object').is(':visible')
      ) {
        // check already video element present
        if (!$el.hasClass('tglider-has-video')) {
          $el.addClass('tglider-video-playing tglider-has-video')

          var _src
          var _html
          var _loadVideo = function (_src, _html) {
            $el
              .find('.tglider-video')
              .append(_this.loadVideo(_src, '', false, _this.core.index, _html))

            if (_html) {
              if (_this.core.s.videojs) {
                try {
                  videojs(
                    _this.core.$slide
                      .eq(_this.core.index)
                      .find('.tglider-html5')
                      .get(0),
                    _this.core.s.videojsOptions,
                    function () {
                      this.play()
                    }
                  )
                } catch (e) {
                  console.error('Make sure you have included videojs')
                }
              } else {
                _this.core.$slide
                  .eq(_this.core.index)
                  .find('.tglider-html5')
                  .get(0)
                  .play()
              }
            }
          }

          if (_this.core.s.dynamic) {
            _src = _this.core.s.dynamicEl[_this.core.index].src
            _html = _this.core.s.dynamicEl[_this.core.index].html

            _loadVideo(_src, _html)
          } else {
            _src =
              _this.core.$items.eq(_this.core.index).attr('href') ||
              _this.core.$items.eq(_this.core.index).attr('data-src')
            _html = _this.core.$items.eq(_this.core.index).attr('data-html')

            _loadVideo(_src, _html)
          }

          var $tempImg = $el.find('.tglider-object')
          $el.find('.tglider-video').append($tempImg)

          // @todo loading icon for html5 videos also
          // for showing the loading indicator while loading video
          if (!$el.find('.tglider-video-object').hasClass('tglider-html5')) {
            $el.removeClass('tglider-complete')
            $el
              .find('.tglider-video-object')
              .on('load.lg error.lg', function () {
                $el.addClass('tglider-complete')
              })
          }
        } else {
          var youtubePlayer = $el.find('.tglider-youtube').get(0)
          var vimeoPlayer = $el.find('.tglider-vimeo').get(0)
          var dailymotionPlayer = $el.find('.tglider-dailymotion').get(0)
          var html5Player = $el.find('.tglider-html5').get(0)
          if (youtubePlayer) {
            youtubePlayer.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              '*'
            )
          } else if (vimeoPlayer) {
            try {
              $f(vimeoPlayer).api('play')
            } catch (e) {
              console.error('Make sure you have included froogaloop2 js')
            }
          } else if (dailymotionPlayer) {
            dailymotionPlayer.contentWindow.postMessage('play', '*')
          } else if (html5Player) {
            if (_this.core.s.videojs) {
              try {
                videojs(html5Player).play()
              } catch (e) {
                console.error('Make sure you have included videojs')
              }
            } else {
              html5Player.play()
            }
          }

          $el.addClass('tglider-video-playing')
        }
      }
    }

    if (
      _this.core.doCss() &&
      _this.core.$items.length > 1 &&
      ((_this.core.s.enableSwipe && _this.core.isTouch) ||
        (_this.core.s.enableDrag && !_this.core.isTouch))
    ) {
      _this.core.$el.on('onSlideClick.lg.tm', function () {
        var $el = _this.core.$slide.eq(_this.core.index)
        loadOnClick($el)
      })
    } else {
      // For IE 9 and bellow
      _this.core.$slide.on('click.lg', function () {
        loadOnClick($(this))
      })
    }

    _this.core.$el.on(
      'onBeforeSlide.lg.tm',
      function (event, prevIndex, index) {
        var $videoSlide = _this.core.$slide.eq(prevIndex)
        var youtubePlayer = $videoSlide.find('.tglider-youtube').get(0)
        var vimeoPlayer = $videoSlide.find('.tglider-vimeo').get(0)
        var dailymotionPlayer = $videoSlide.find('.tglider-dailymotion').get(0)
        var vkPlayer = $videoSlide.find('.tglider-vk').get(0)
        var html5Player = $videoSlide.find('.tglider-html5').get(0)
        if (youtubePlayer) {
          youtubePlayer.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          )
        } else if (vimeoPlayer) {
          try {
            $f(vimeoPlayer).api('pause')
          } catch (e) {
            console.error('Make sure you have included froogaloop2 js')
          }
        } else if (dailymotionPlayer) {
          dailymotionPlayer.contentWindow.postMessage('pause', '*')
        } else if (html5Player) {
          if (_this.core.s.videojs) {
            try {
              videojs(html5Player).pause()
            } catch (e) {
              console.error('Make sure you have included videojs')
            }
          } else {
            html5Player.pause()
          }
        }
        if (vkPlayer) {
          $(vkPlayer).attr(
            'src',
            $(vkPlayer).attr('src').replace('&autoplay', '&noplay')
          )
        }

        var _src
        if (_this.core.s.dynamic) {
          _src = _this.core.s.dynamicEl[index].src
        } else {
          _src =
            _this.core.$items.eq(index).attr('href') ||
            _this.core.$items.eq(index).attr('data-src')
        }

        var _isVideo = _this.core.isVideo(_src, index) || {}
        if (
          _isVideo.youtube ||
          _isVideo.vimeo ||
          _isVideo.dailymotion ||
          _isVideo.vk
        ) {
          _this.core.$outer.addClass('tglider-hide-download')
        }

        //$videoSlide.addClass('tglider-complete');
      }
    )

    _this.core.$el.on('onAfterSlide.lg.tm', function (event, prevIndex) {
      _this.core.$slide.eq(prevIndex).removeClass('tglider-video-playing')
    })
  }

  Video.prototype.loadVideo = function (src, addClass, noposter, index, html) {
    var video = ''
    var autoplay = 1
    var a = ''
    var isVideo = this.core.isVideo(src, index) || {}

    // Enable autoplay for first video if poster doesn't exist
    if (noposter) {
      if (this.videoLoaded) {
        autoplay = 0
      } else {
        autoplay = 1
      }
    }

    if (isVideo.youtube) {
      a = '?wmode=opaque&autoplay=' + autoplay + '&enablejsapi=1'
      if (this.core.s.youtubePlayerParams) {
        a = a + '&' + $.param(this.core.s.youtubePlayerParams)
      }

      video =
        '<iframe class="tglider-video-object tglider-youtube ' +
        addClass +
        '" width="560" height="315" src="//www.youtube.com/embed/' +
        isVideo.youtube[1] +
        a +
        '" frameborder="0" allowfullscreen></iframe>'
    } else if (isVideo.vimeo) {
      a = '?autoplay=' + autoplay + '&api=1'
      if (this.core.s.vimeoPlayerParams) {
        a = a + '&' + $.param(this.core.s.vimeoPlayerParams)
      }

      video =
        '<iframe class="tglider-video-object tglider-vimeo ' +
        addClass +
        '" width="560" height="315"  src="//player.vimeo.com/video/' +
        isVideo.vimeo[1] +
        a +
        '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
    } else if (isVideo.dailymotion) {
      a = '?wmode=opaque&autoplay=' + autoplay + '&api=postMessage'
      if (this.core.s.dailymotionPlayerParams) {
        a = a + '&' + $.param(this.core.s.dailymotionPlayerParams)
      }

      video =
        '<iframe class="tglider-video-object tglider-dailymotion ' +
        addClass +
        '" width="560" height="315" src="//www.dailymotion.com/embed/video/' +
        isVideo.dailymotion[1] +
        a +
        '" frameborder="0" allowfullscreen></iframe>'
    } else if (isVideo.html5) {
      var fL = html.substring(0, 1)
      if (fL === '.' || fL === '#') {
        html = $(html).html()
      }

      video = html
    } else if (isVideo.vk) {
      a = '&autoplay=' + autoplay
      if (this.core.s.vkPlayerParams) {
        a = a + '&' + $.param(this.core.s.vkPlayerParams)
      }

      video =
        '<iframe class="tglider-video-object tglider-vk ' +
        addClass +
        '" width="560" height="315" src="http://vk.com/video_ext.php?' +
        isVideo.vk[1] +
        a +
        '" frameborder="0" allowfullscreen></iframe>'
    }

    return video
  }

  Video.prototype.destroy = function () {
    this.videoLoaded = false
  }

  $.fn.tangibleGlider.modules.video = Video
})(jQuery, window, document)
