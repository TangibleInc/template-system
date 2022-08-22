(function ($) {
  $('table.posts #the-list, table.pages #the-list').sortable({
    items: 'tr',
    axis: 'y',
    // https://api.jqueryui.com/sortable/#option-cancel
    cancel: 'a,input,textarea,button,select,option,.disable-drag',
    update: function (e, ui) {
      $.post(window.ajaxurl, {
        action: 'tangible_sortable_post_type__update_menu_order',
        order: $('#the-list').sortable('serialize'),
      })
    },
  })

})(jQuery)
