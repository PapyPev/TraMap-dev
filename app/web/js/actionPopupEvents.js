/** ***************************************************************************
 * Popup Events.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

function buttonFocus () {

  var key = document.getElementById("textFocusKeyword");
  var lat = document.getElementById("textFocusLatLong-Lat");
  var lon = document.getElementById("textFocusLatLong-Long");

  alert(key.innerHTML, lat.innerHTML, lon.innerHTML);

};