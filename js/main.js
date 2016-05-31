
$(function () {
	$('#pop-right').popover({
    trigger: 'hover',
        'placement': 'right'
});
});

/* ==========================================================================
Header Nav
========================================================================== */

$(document).ready(function() {

		$('.menu').click(function(e) {
			e.stopPropagation();
			$('#main_nav').toggleClass('active');
		});

		$(document).click(function() {
			$('#main_nav').removeClass('active');
		});
});

/* ==========================================================================
Places Dropdown
========================================================================== */

$(document).ready(function(){
	$(".dropdown-toggle").dropdown();
});

var TabbedNav = (function() {

  // Module variable declaration
  var _$tab_nav_link = $('.js-tabs-nav-link'),
    _$tab = $('.js-tabs-body'),
    _active_class = 'is-active';

  // Click event handler for tab nav links.
  // Displays the appropriate tab
  function _changeTab(event) {
    event.preventDefault();

    // Change active state of tab nav links
    _$tab_nav_link.removeClass(_active_class);
    var index = $(this).addClass(_active_class)
      .index();

    // Change active state of tab
    _$tab.removeClass(_active_class)
      .eq(index)
      .addClass(_active_class);
  }

  // Initialise the module by binding the event handlers
  function init() {
    _$tab_nav_link.click(_changeTab);
  }

  // Export this methods
  return {
    init: init
  };

})();

TabbedNav.init();


/* ==========================================================================
Flexslider
========================================================================== */

$(window).load(function() {
  $('.flexslider').flexslider({
    directionNav: false,
    controlNav: false,
    animation: "slide",
    slideshow: false,
  });
});

$('.flex-prev, .flex-next').on('click', function(){
    var href = $(this).attr('href');
    $('.flexslider').flexslider(href);
    return false;
});

// GMAPS
// ---------------------------------------------------
!function ($) {

    // -------------------------
    // Map Style definition
    // -------------------------

    // Custom core styles
    // Get more styles from http://snazzymaps.com/style/29/light-monochrome
    // - Just replace and assign to "MapStyles" the new style array
    var MapStyles = [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}];


    // -------------------------
    // Custom Script
    // -------------------------

    var mapSelector = '[data-toggle="gmap"]';

    if($.fn.gMap) {
        var gMapRefs = [];

        $(mapSelector).each(function(){

            var $this   = $(this),
                addresses = $this.data('address') && $this.data('address').split(';'),
                titles    = $this.data('title') && $this.data('title').split(';'),
                zoom      = $this.data('zoom') || 14,
                maptype   = $this.data('maptype') || 'ROADMAP', // or 'TERRAIN'
                markers   = [];

            if(addresses) {
              for(var a in addresses)  {
                  if(typeof addresses[a] == 'string') {
                      markers.push({
                          address:  addresses[a],
                          html:     (titles && titles[a]) || '',
                          popup:    true   /* Always popup */
                        });
                  }
              }

              var options = {
                  controls: {
                         panControl:         true,
                         zoomControl:        true,
                         mapTypeControl:     true,
                         scaleControl:       true,
                         streetViewControl:  true,
                         overviewMapControl: true
                     },
                  scrollwheel: false,
                  maptype: maptype,
                  markers: markers,
                  zoom: zoom,
                  icon: {
			        image: "img/logo_marker.svg",
			        iconsize: [16, 16],
			        shadowsize: [64, 64],
			        iconanchor: [64, 64],
			        shadowanchor: [64, 64]
			    }
                  // More options https://github.com/marioestrada/jQuery-gMap
              };

              var gMap = $this.gMap(options);

              var ref = gMap.data('gMap.reference');
              // save in the map references list
              gMapRefs.push(ref);

              // set the styles
              if($this.data('styled') !== undefined) {

                ref.setOptions({
                  styles: MapStyles
                });

              }
            }

        }); //each
    }

    // Center Map marker on resolution change
    $(window).resize(function() {

        if(gMapRefs && gMapRefs.length) {
            for( var r in gMapRefs) {
              var mapRef = gMapRefs[r];
              var currMapCenter = mapRef.getCenter();
              if(mapRef && currMapCenter) {
                  google.maps.event.trigger(mapRef, "resize");
                  mapRef.setCenter(currMapCenter);
              }
            }
        }
    });


}(window.jQuery)


/* ==========================================================================
Validation
========================================================================== */

$(document).ready(function() {
    $('#contactForm').formValidation({
        // I am validating Bootstrap form

        // Feedback icons
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // List of fields and their validation rules
        fields: {
            fullName: {
                validators: {
                    notEmpty: {
                        message: 'Please enter your name'
                    },
                    stringLength: {
                        min: 2,
                        message: 'Please enter your name'
                    },
                }
            },
						phoneNumber: {
                    validators: {
											notEmpty: {
	                        message: 'Please enter a phone number including area code'
	                    },
                        phone: {
														country: 'US',
                            message: 'Please enter a phone number including area code'
                        },
                    }
                }
        }
    });
});


/* ==========================================================================
Email Submission
========================================================================== */
$("#contactForm").submit(function(event){
    // cancels the form submission
    event.preventDefault();
    submitForm();
});

function submitForm(){
    // Initiate Variables With Form Content
    var fullName = $("#fullName").val();
    var phoneNumber = $("#phoneNumber").val();
    var message = $("#message").val();

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: "fullName=" + fullName + "&phoneNumber=" + phoneNumber + "&message=" + message,
        success : function(text){
            if (text == "success"){
                formSuccess();
            }
        }
    });
}
