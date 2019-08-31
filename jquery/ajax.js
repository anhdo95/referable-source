window.onload = function() {
  var _config = {

    // What you might want to change
    addToCartBtnLabel:             'Add to cart',
    addedToCartBtnLabel:           'Thank you!',
    addingToCartBtnLabel:          'Adding...',
    soldOutBtnLabel:               'Sold Out',
    howLongTillBtnReturnsToNormal: 1000, // in milliseconds.
    // cartCountSelector:             '.cart-count, #cart-count a:first, #gocart p a, #cart .checkout em, .item-count',
    cartCountSelector: '#CartCount',
    cartTotalSelector:             '#cart-price',
    // 'aboveForm' for top of add to cart form,
    // 'belowForm' for below the add to cart form, and
    // 'nextButton' for next to add to cart button.
    feedbackPosition:              'nextButton',

    // What you will never need to change
    addToCartBtnSelector:          '[type="submit"]',
    addToCartFormSelector:         'form[action="/cart/add"]',
    shopifyAjaxAddURL:             '/cart/add.js',
    shopifyAjaxCartURL:            '/cart.js'
  };

  var handleSuccess = function(itemData) {

  }

  var handleError = function(XMLHttpRequest) {

  }

  var ajaxRequest = (function($) {

    $(_config.addToCartFormSelector).submit(function(e) {
      e.preventDefault();
      var $addToCartForm = $(this);
      var $addToCartBtn = $addToCartForm.find(_config.addToCartBtnSelector);
      $addToCartBtn.addClass('disabled').prop('disabled', true);
      // Add to cart.
      $.ajax({
        url: _config.shopifyAjaxAddURL,
        dataType: 'json',
        type: 'post',
        data: $addToCartForm.serialize(),
        success: handleSuccess,
        error: handleError
      })

      return false;
    })

    return {
      init: function(params) {
          // Configuration
          params = params || {};
          // Merging with defaults.
          $.extend(_config, params);
          // Action
          $(function() {
            _init();
          });
      },
      getConfig: function() {
        return _config;
      }
    }
  })(jQuery)

  ajaxRequest.init();
}

