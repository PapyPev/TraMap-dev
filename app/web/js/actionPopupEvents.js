/** ***************************************************************************
 * Popup Events.
 *
 * @author Pev
 * @version 1.1
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
 * Find itinerary betwin origin and destination
 * @param {Object} origin Origin contains lat and long coordinates
 * @param {Object} destination Destination contains lat and long coordinates
 --------------------------------------------------------------------------- */
function findItinerary (origin, destination) {
  console.log("actionPopupEvents.findItinerary(...)");
  console.log("From:"+origin.toString()+" - To:"+destination.toString());

  // TODO : algo

}; //--- end findItinerary (origin, destination)

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

    // Add point on list
    listOD.push(e.latlng);

    // If we have 2 points
    if (listOD.length == 2) {
      // Remove click event
        map.off('click');
      // Remove cursor style
      $('.leaflet-container').css('cursor','');
      // Run itinerary alorithm
      findItinerary(listOD[0], listOD[1]);
    };

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

