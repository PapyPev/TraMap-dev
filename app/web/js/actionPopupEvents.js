/** ***************************************************************************
 * Popup Events.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

function buttonFocus () {

  var key = document.getElementById("textFocusKeyword").value;
  var lat = document.getElementById("textFocusLatLong-Lat").value;
  var lon = document.getElementById("textFocusLatLong-Long").value;

  alert(key + " " + lat + " "+ lon);

};

function buttonSearch () {

  map.on('click', function(e) {
    alert(e.containerPoint.toString() + ', ' + e.latlng.toString());
  });

};