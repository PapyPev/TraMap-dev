/** ***************************************************************************
 * Popup Events.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

function buttonFocus () {

  var key = document.getElementById("focusKeyword");
  var lat = document.getElementById("focusLatLong-Lat");
  var lon = document.getElementById("focusLatLong-Long");

  alert(key.innerHTML, lat.innerHTML, lon.innerHTML);

};