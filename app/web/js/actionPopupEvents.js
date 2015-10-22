/** ***************************************************************************
 * Popup Events.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

/* ============================================================================
 * GLOBALS
 * ========================================================================= */

// List : origin destination
var listOD;

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Get form value from focus popup and focus on values
 --------------------------------------------------------------------------- */
function buttonFocus () {
  console.log("actionPopupEvents.buttonFocus()");

  var key = document.getElementById("textFocusKeyword").value;
  var lat = document.getElementById("textFocusLatLong-Lat").value;
  var lon = document.getElementById("textFocusLatLong-Long").value;

  alert(key + " " + lat + " "+ lon);

}; //--- end buttonFocus ()

/**
 * Active mouse click and wait two points : origin and destination.
 --------------------------------------------------------------------------- */
function buttonSearch () {
  console.log("actionPopupEvents.buttonSearch()");

  // Init list origin-destination
  listOD = [];

  // Change cursor symbol
  $('.leaflet-container').css('cursor','crosshair');

  // Active click on the map
  map.on('click', function(e) {
    alert(e.containerPoint.toString() + ', ' + e.latlng.toString());
    listOD.push(e.latlng);
    console.log("latlong");
    console.log(listOD);
  });

  // If esc is pressed
  $(document).keyup(function(e) {
     if (e.keyCode == 27) {

        // Remove click event
        map.off('click');

        // Remove cursor style
        $('.leaflet-container').css('cursor','');
    }

  });

}; //--- end buttonSearch()

