/** ***************************************************************************
 * Popup Events.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

function buttonFocus () {

  var key = document.getElementById("focusKeyword").value;
  var lat = document.getElementById("focusLatLong-Lat").value;
  var lon = document.getElementById("focusLatLong-Long").value;

  alert(key, lat, lon);

};