jQuery(document).ready(function($) {

  $('.notice.is-dismissible').each(function() {

    var $el = $(this)
    var key = $el.data('tangibleAdminNotice')
    if (!key) return

    // Event handler on notice itself, not button
    $el.on('click', '.notice-dismiss', function(e) {

      e.preventDefault()

      // See ./enqueue

      var data = {
        action: 'tangible_admin_dismiss_notice',
        admin_notice_key: key,
        nonce: window.tangibleAdminDismissNotice.nonce
      }

      $.post(window.ajaxurl, data)

    })
  })
})
