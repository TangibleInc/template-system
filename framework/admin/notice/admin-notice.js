jQuery(document).ready(function($) {

  $('.notice.is-dismissible').each(function() {

    var $el = $(this)
    var key = $el.data('tangibleAdminNotice')
    if (!key) return

    // Event handler on notice itself, not button
    $el.on('click', '.notice-dismiss', function(e) {

      e.preventDefault()

      // See admin-notices/enqueue

      var data = {
        action: 'tangible_dismiss_admin_notice',
        admin_notice_key: key,
        nonce: window.tangibleAdminNotice.nonce
      }

      $.post(window.ajaxurl, data)

    })
  })
})