/** ***************************************************************************
 * Map Loader.
 * Initialize Map content
 *
 * @author Pev
 * @version 4.0
 *************************************************************************** */

/* ============================================================================
 * GLOBALS
 * ========================================================================= */

// MapProperties
var mapProperties;

// Leaflet Map Layers
var mapLayers;

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Recovery of all data sources.
 * @return {array} List of LayerProperties (classLayerProperties).
 --------------------------------------------------------------------------- */
function getMapLayers () {
  console.log('actionMapLoader.getMapLayers()');

  // Prepare output
  listOfLayers = [];

  //---------- BACKGROUND

  // Create Copyright
  var tiles_copyright = 'Map data &copy;' 
    + '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' 
    + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
    + 'Imagery © <a href="http://mapbox.com">Mapbox</a>'

  // Get tiles sources
  var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
    +'access_token=' + mapProperties.getMapboxToken();

  //Create leaflet Layer
  var bgLight = L.tileLayer(mbUrl, {
    id: 'mapbox.light', 
    attribution: tiles_copyright
  })
  var bgDark = L.tileLayer(mbUrl, {
    id: 'mapbox.dark', 
    attribution: tiles_copyright
  })
  var bgStreet = L.tileLayer(mbUrl, {
    id: 'mapbox.streets', 
    attribution: tiles_copyright
  });

  // Create metadata layer
  var bgLightM = new LayerProperties("Radio", "Background", 
    "bgLight", "MapBox : Light", 0, false, bgLight);
  var bgDarktM = new LayerProperties("Radio", "Background", 
    "bgDark", "MapBox : Dark", 1, false, bgDark);
  var bgStreetM = new LayerProperties("Radio", "Background", 
    "bgStreet", "MapBox : Street", 2, true, bgStreet);

  // Add Tiles to default loaded map layers
  listOfLayers.push(bgLightM, bgDarktM, bgStreetM);


  //---------- GEOSERVER

  // Get GeoServer Layer
  var listGeoServerLayer = [];
  listGeoServerLayer = getGeoServerLayers(GEO_SRV, GEO_USER, GEO_PASS, GEO_REPO, PROJ, mapBoundingBox);

  console.log("actionMapLoader.getMapLayers() [listGeoServerLayer]");
  console.log(listGeoServerLayer);

  // Loop for adding to listOfLayers
  for (var i = 0; i < listGeoServerLayer.length; i++) {
    listOfLayers.push(listGeoServerLayer[i]);
  };

  console.log("actionMapLoader.getMapLayers() [listOfLayers]:");
  console.log(listOfLayers);


  // TODO : sort layers by category


  // Return the layer's list
  return listOfLayers;
}; //--- end getLayers



/**
 * Loading all the necessary components of the card
 --------------------------------------------------------------------------- */
function init () {
  console.log('actionMapLoader.init()');

  //---------- Load Map Properties
  mapProperties = new MapProperties('map', './config/configMap.json');

  //---------- Load Sidebar Component
  var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: mapProperties.getSidebarPos()
  });
  mapProperties.getMap().addControl(sidebar);

  //---------- Load Layers (classLayer)
  mapLayers = [];
  mapLayers = getMapLayers();

};

/* ============================================================================
 * MAIN
 * ========================================================================= */

/**
 * Action performed when the page is fully loaded
 --------------------------------------------------------------------------- */
$(document).ready(function(){
  console.log('actionMapLoader.$document.ready()');
  init();
}); //--$(document).ready()