/*
|------------------------------------------------------------------------------
| Geoserver Layers functions.
|------------------------------------------------------------------------------
|
| To centralize and simplify GeoServer functions access, style and features
|
| @author Fanda/Pev
| @verion 1.1.5
|
|------------------------------------------------------------------------------
*/

var _LAY = "";

// ============================================================================
// FUNCTIONS
// ============================================================================

/**
 * [Convert coordinate Lat/Long to Mercator projection]
 * @param {Float} lat [Latitude coordinate on Lat/Long projection]
 * @param {Float} lon [Longitude coordinate on Lat/Long projection]
 * @return {json} Coordinates on Mercator projection
 */
function convert_LatLonToMercator(lat, lon) {
  var rMajor = 6378137; //Equatorial Radius, WGS84
  var shift  = Math.PI * rMajor;
  var x = lon * shift / 180;
  var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
  y = y * shift / 180;
  return {'X': x, 'Y': y};
} //-- end convert_LatLonToMercator(lat, lon)

// ----------------------------------------------------------------------------


/**
 * [This function gives a visual style to feature in a Layer]
 * @param {Object} feature [Feature of the layer]
 * @param {Object} latlng [Coordinates of the feature]
 */
function gs_setStyle(feature, latlng) {
  console.log(layerName)

  var layerName = "traffic";
  var layerStyle = styleProperties.getLayerStyle(layerName);

  if (layerStyle.filters) {
    switch(layerStyle.filters_type){
      //~~~~~~~~~~~~~~~~~~~~
      case "key":

        for (var i = layerStyle.styles.length - 1; i >= 0; i--) {
          if (layerStyle.styles[i].filter === feature.properties.type) {
            // Multi style by key
            if (layerStyle.type==="Point") {
              var marker = L.icon({
                iconUrl: layerStyle.styles[i].icon_url,
                iconSize: layerStyle.styles[i].icon_size,
                iconAnchor: layerStyle.styles[i].icon_anchor,
                popupAnchor: layerStyle.styles[i].icon_popanchor
              });
              return L.marker(latlng,{icon: marker});
            } else {
              // One style
              return layerStyle.styles[i];
            }
          } // if style.filter === feature.type
        } // end for layerStyle.styles.length

        break; // end key
      //~~~~~~~~~~~~~~~~~~~~
      case "bounds":

        var val = layerStyle.attribute_value
        for (var i = layerStyle.styles.length - 1; i >= 0; i--) {
          if (layerStyle.styles[i].value_min <= feature.properties[val] &&
            feature.properties[val] < layerStyle.styles[i].value_max) {
              // Line and Polygon Style
              if (layerStyle.type==="Line" || layerStyle.type === "Polygon") {
                return layerStyle.styles[i];
              } else {
                // No style for other
                return false;
              }
          } // filter ni bounds
        } // end for layerStyle.styles.length
        
        break; // end bounds
      //~~~~~~~~~~~~~~~~~~~~
      default:
        // By default marker by Leaflet for point
        if (feature.properties.geometry !== "Point") {
          // If a styl exists
          if (layerStyle.styles[i]) {
            return layerStyle.styles[i];
          } else {
            // Default fix style
            return {color: "green", weight: 1, opacity: 0.5}
          }
        }

        break; // end default
    } // //switch(layerStyle.filters_type)
  } // if (layerStyle.filters)

}

// ----------------------------------------------------------------------------

/**
 * [Add bind Popup to feature]
 * @param {Object} feature [The feature object]
 * @param {Object} layer   [The layer object]
 */
function gs_setPopup(feature, layer) {

  var layerName = "traffic";
  var layerStyle = styleProperties.getLayerStyle(layerName);

  // If we have a popup
  if (layerStyle.popup_activate) {
    var val = layerStyle.attribute_alias;
    layer.bindPopup(feature.properties[val].toString());
  }

} //-- end gs_setPopup(feature, layer)

// ----------------------------------------------------------------------------

/**
 * [Execute asynchronous request and return layerContent]
 * @param  {String} layerUrl  [URL to the layer on the GeoServer]
 * @param  {Object} southWest [SouthWest lat/lon coordinate]
 * @param  {Object} northEast [NorthEast lat/lon coordinate]
 * @param  {String} layerName [Name of the current layer]
 * @return {Object}           [the current layer object -> for the map]
 */
function gs_query(layerUrl, southWest, northEast, layerName){
  return new L.GeoJSON.AJAX(layerUrl
    +"&bbox="+southWest.X+","+southWest.Y+","
    +northEast.X+","+northEast.Y,
    {
      onEachFeature: gs_setPopup, // popup information
      style: gs_setStyle, // for line and polygon
      pointToLayer: gs_setStyle // for point
    }
  );
}

/**
 * [This function gives a visual style to data]
 * @param  {String} url         [The GeoServer address]
 * @param  {String} repository  [The GeoServer repository]
 * @param  {String} projection  [The default map projection]
 * @param  {Number} maxFeatures [Number of maxFeatures per query]
 * @param  {Object} bbox        [The current map Bounding Box (map extent)]
 * @return {Object}             [Return a list of classLayerProperties object]
 */
function gs_getGeoserverLayers(url, repository, projection, maxFeatures, bbox){

  // Get bbox on Mercator projection (from Lat/Long)
  var southWest = convert_LatLonToMercator(
    bbox._southWest.lat,
    bbox._southWest.lng
  );
  var northEast = convert_LatLonToMercator(
    bbox._northEast.lat,
    bbox._northEast.lng
  );

  // Return value : list of layers
  var listOfLayers = [];
  
  // Prepare POST Request to Geoserver for GetCapabilities XML File
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

  // Callback function after sent the request
  xmlhttp.onload = function() {

    // Prepare the xmlVariable
    var xmlDoc = new DOMParser().parseFromString(
      xmlhttp.responseText,'text/xml');

    // Get layer list
    var x = xmlDoc.getElementsByTagName("FeatureTypeList");

    // Loop Layer Layer's list
    for (i=0;i<x.length;i++){

      // Get layer child on the layer's list
      var y = x[i].getElementsByTagName("FeatureType");

      // Loop on layer's properties
      for (var i = 0; i < y.length; i++) {

        // Save layer Name
        var layerValue = y[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;

        // Prepare the Category Name
        var layerCategory = "";

        // Prepare the Layer Name
        var layerName = layerValue;

        // If the layer have a prefix
        if (layerValue.split("_")[1]) {
          layerCategory = layerValue.split("_")[0];
          layerName = layerValue.split("_")[1];
        } else{
          layerCategory = "Data";
        };

        // Prepare the URL for getting vector data
        var layerUrl = url
          +"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="
          +repository+":"+layerValue
          +"&srsName="+projection
          +"&SRS="+projection
          +"&maxFeatures="+maxFeatures
          +"&outputFormat=application/json";

        // Get GeoJSON layer content
        var layerContent = gs_query(layerUrl, southWest, northEast, layerName);

        // Layer Style from configLayerStyle
        var layerStyle = null;
        if (styleProperties.getLayerStyle(layerValue)) {
          layerStyle = styleProperties.getLayerStyle(layerValue);
        };

        // Get the default visibility
        var visible = false;
        if (layerStyle!=null && layerStyle.visible) {
          visible = layerStyle.visible;
        };

        // Get the Alias for the layer
        var alias = layerName;
        if (layerStyle!=null && layerStyle.alias) {
          alias = layerStyle.alias;
        };

        // Create the layer
        var theLayer = new LayerProperties(
          "Checkbox", 
          layerCategory, 
          layerName,
          alias,
          i,
          visible,
          layerUrl,
          layerContent
        );

        // Add to list of layers
        listOfLayers.push(theLayer);

      } // end Loop on layer's properties
    } // end Loop Layer Layer's list
  }; // end xmlhttp.onload = function()

  // Request for GetCapabilities - After request : callbac function
  xmlhttp.open(
    "POST",
    url+'/'+repository+'/ows?SERVICE=WFS&REQUEST=GetCapabilities',
    false // True=async and False=synchronous
  );
  xmlhttp.send();

  // Return tab of classLayers
  return listOfLayers;
} //--- end gs_getGeoserverLayers(url)

