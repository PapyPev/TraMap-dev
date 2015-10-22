/** ***************************************************************************
 * Popup Events.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

/* ============================================================================
 * GLOBALS
 * ========================================================================= */

// Number of clicks for buttonSearch
var nbClick;

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Get form value from focus popup and focus on values
 --------------------------------------------------------------------------- */
function buttonFocus () {

  var key = document.getElementById("textFocusKeyword").value;
  var lat = document.getElementById("textFocusLatLong-Lat").value;
  var lon = document.getElementById("textFocusLatLong-Long").value;

  alert(key + " " + lat + " "+ lon);

}; //--- end buttonFocus ()

/**
 * Active mouse click and wait two points : origin and destination.
 --------------------------------------------------------------------------- */
function buttonSearch () {

  // Change cursor symbol
  $('.leaflet-container').css('cursor','crosshair');

  // Active click on the map
  map.on('click', function(e) {
    alert(e.containerPoint.toString() + ', ' + e.latlng.toString());
  });

  // Remove cursor style
  //$('.leaflet-container').css('cursor','');

  // If esc is pressed
  $(document).keyup(function(e) {
     if (e.keyCode == 27) {

        alert('ESC');

        // Remove click event
        map.off('click');

        // Remove cursor style
        $('.leaflet-container').css('cursor','');
    }

  });

}; //--- end buttonSearch()

