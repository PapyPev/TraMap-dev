/** ***************************************************************************
 * Geoserver Layers.
 * Geoserver functions
 *
 * @author Fanda/Pev
 * @version 2.1
 *************************************************************************** */

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

function converLLMerc (lat, lon) {
  var x = lon * 20037508.34 / 180;
  var y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return [x, y]
}

/**
 * This function gives a visual style to data
 * @param {number} feature Type's number of feature
 * @return {json} Style properties
 --------------------------------------------------------------------------- */
function setStyle(feature) {
  //console.log("actionGeoServerLayers.setStyle("+feature+")");

    // Switch on class properties
    switch (feature.properties.clazz) {

      // TODO : Comment
      case 31: return {color: "orange", weight: 17, opacity: 0.5};

      // TODO : Comment
      case 32: return {color: "#0000ff", weight: 17, opacity: 0.5};

    } //end switch(feature.properties.clazz)
};

/**
 * This function gives a visual style to data
 * @param {string} url The GeoServer address
 * @param {string} repository The GeoServer repository
 * @param {string} projection The default map projection
 * @param {string} bbox The current map Bounding Box (map extent)
 * @return {LayerProperties} Return a classLayerProperties object 
 --------------------------------------------------------------------------- */
function getGeoServerLayers(url, repository, projection, bbox){
  console.log("actionGeoServerLayers.getGeoServerLayers()");

  // Convert Lat/Long to Mercator
  var southWest = converLLMerc(bbox._southWest.lat, bbox._southWest.lng);
  var northEast = converLLMerc(bbox._northEast.lat, bbox._northEast.lng);

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
        var layerName = y[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;

        // Get GeoJSON layer content
        var layerContent = new L.GeoJSON.AJAX(
          url
          +"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="
          +repository+":"+layerName
          +"&srsName="+projection
          +"&SRS="+projection
          +"&bbox="+southWest[1]+","+southWest[0]+","
          +northEast[1]+","+northEast[0]
          +"&maxFeatures=100"
          +"&outputFormat=application/json"//,
          // {
          //   style: setStyle
          // }
        );

        // Add to list of layers
        listOfLayers.push(new LayerProperties(
          "Checkbox", 
          "Data", 
          layerName,
          layerName,
          i,
          true,
          layerContent
        ));

      }; // end Loop on layer's properties

    }; // end Loop Layer Layer's list

  } // end xmlhttp.onload = function()

  // Request for GetCapabilities
  xmlhttp.open(
    "POST",
    url+'/'+repository+'/ows?SERVICE=WFS&REQUEST=GetCapabilities',
    false // True=async and False=synchronous
  );

  xmlhttp.send();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ONLY ONE LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  /*
  // TODO : Loop to get all layers

    var alias = "hamk-map-project:fin_2po_4pgr";
    var baseurl = url+"/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+alias+"&maxFeatures=100&outputFormat=application/json";

  // Get layer from GeoServer
    // var myLayer = new L.GeoJSON.AJAX(baseurl,{
    //  style: setStyle
    // });

  // Get layer from temp contant
    var myLayer = new L.geoJson(temp,{
        style: setStyle
    });

    // Prepare classLayer's attribute
    var l1 = new Layer(
    "Checkbox", 
    "Traffic Information", 
    "traffic", 
    alias, 
    1, 
    true, 
    myLayer
  );

  //listOfLayers.push(l1);
  */

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ ONLY ONE LAYER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // Return temp classLayer  
    //return [l1];

  // Return tab of classLayers
  return listOfLayers;
}; //--- end getGeoServerLayers(url){

