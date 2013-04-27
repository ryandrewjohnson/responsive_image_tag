(function($) {
  if(!$.responsiveImageTag){
    $.responsiveImageTag = new Object();
  };

  $.responsiveImageTag = function(el, options) {
    // updated for shaka
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base, $window, platform;

    base = this;

    platform = {
      handheld: 320,
      tablet: 1024,
    };

    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    base.el.data('responsiveImageTag', base);
    base.options = $.extend({}, $.responsiveImageTag.defaultOptions, options);

    //Public functions
    base.init = function() {

      $window = $(window);
      // Test for available width in current browser window
      // 767px, anything smaller than an ipad is considered mobile
      var $img = $("<img/>", {
                    "alt": base.$el.attr("data-alttext"),
                    "class": base.$el.attr("data-cssclass")
                  });

      //handheld
      if($window.width() <= platform.handheld) {
        $img.attr("src", base.$el.attr("data-smallsrc"));
      }
      //tablet 
      else if($window.width() > platform.handheld && $window.width() <= platform.tablet) {
        $img.attr("src", base.$el.attr("data-medsrc"));
      }
      //desktop
      else {
        $img.attr("src", base.$el.attr("data-lrgsrc"));
      }

      base.$el.prev().append($img);
      base.$el.hide();
    };

    // Call init function
    base.init();
  };

  $.responsiveImageTag.defaultOptions = {
    // Currently no options
  };

  $.fn.responsiveImageTag = function(options) {
    return this.each(function() {
       (new $.responsiveImageTag($(this), options));
    });
  };

  //Private function

})(jQuery);