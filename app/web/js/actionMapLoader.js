/** ***************************************************************************
 * Map Loader.
 * Initialize Map content
 *
 * @author Pev
 * @version 2.2
 *************************************************************************** */


/* ============================================================================
 * CONSTANTS
 * ========================================================================= */

var GEO_SRV = 'http://172.18.138.171/geoserver/ows';
var PROJ = 'EPSG:3857';
var TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'

var DEFAULT_CENTER = [60.736622, 24.779603];
var DEFAULT_ZOOM = 7;

var TOC_DIV_TITLE = 'toc-title';
var TOC_DIV_CONTENT = 'toc-content';
var TOC_DIV_DESCRIPT = 'toc-description';

var TOC_TITLE = 'toc-title';
var TOC_CONTENT = 'toc-content';
var TOC_DESCRIPT = 'toc-description';
/* ============================================================================
 * GLOBAL VARIABLES
 * ========================================================================= */
var map;
var mapLayers;

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Recovery of all data sources.
 * @return {array} List of Layer (classLayer).
 --------------------------------------------------------------------------- */
function getMapLayers () {

  // Prepare output
  listOfLayers = [];

  //--- BACKGROUND ------

  // Create Copyright
  var tiles_copyright = 'Map data &copy;' 
    + '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' 
    + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
    + 'Imagery © <a href="http://mapbox.com">Mapbox</a>'

  // Get tiles sources
  var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
    +'access_token=' + TOKEN;

  //Create leaflet Layer
  var bgLight = L.tileLayer(mbUrl, {
    id: 'mapbox.light', 
    attribution: tiles_copyright
  })
  var bgStreet = L.tileLayer(mbUrl, {
    id: 'mapbox.streets', 
    attribution: tiles_copyright
  });

  // Create metadata layer
  var bgLightM = new Layer("Tiles", "Background", 
    "bgLight", "MapBox : Light", 0, true, bgLight);
  var bgStreetM = new Layer("Tiles", "Background", 
    "bgStreet", "MapBox : Street", 1, false, bgStreet);

  // Add Tiles to default loaded map layers
  listOfLayers.push(bgLightM, bgStreetM);


  //--- GEOSERVER ------

  // Get GeoServer Layer
  var listGeoServerLayer = [];
  listGeoServerLayer = getGeoServerLayers(GEO_SRV)

  // Loop for adding to listOfLayers
  for (var i = 0; i < listGeoServerLayer.length; i++) {
    listOfLayers.push(listGeoServerLayer[i]);
  };


  // TODO : sort layers by category


  // Return the layer's list
  return listOfLayers;

} // end getLayers

/**
 * Load content of Table Of Content (TOC).
 * @param {list} listOfLayers A sorted list of classLayer
 --------------------------------------------------------------------------- */
function loadToc (map, listOfLayers) {

  // Add TOC title and description
  $("#"+TOC_DIV_TITLE+"").html(TOC_TITLE).trigger("create");
  $("#"+TOC_DIV_DESCRIPT+"").html(TOC_DESCRIPT).trigger("create");

  // Prepare TOC content
  var toc = "";

  // Layers Loop
  for (var i = 0; i < listOfLayers.length; i++) {

    // Test if it's the first category or a new
    if (i==0 
      || listOfLayers[i].getCategory()!=listOfLayers[i-1].getCategory()) {
      toc += '<div class="panel panel-default">'
        + '<div class="panel-heading">'
        +   '<h6 class="panel-title">'+listOfLayers[i].getCategory()+'</h6>'
        + '</div>'
        + '<div class="panel-body">'
    };

    // Test if checkbox is checked
    var check = "";
    if (listOfLayers[i].getCheck()==true) {check="checked"};

    // Test type of data 
    switch(listOfLayers[i].getType()){
      case "Tiles":
        toc +=  '<div class="input-group">'
          +     '<span class="input-group-addon">'
          +       '<input type="radio" '
          +       'name="'+listOfLayers[i].getCategory()+'" '
          +       'id="'+listOfLayers[i].getPosition()+'" '
          +       'onclick="changeLayer('+i+')" '
          +       check + '>'
          +     '</span>'
          +   '<input type="text" class="form-control" '
          +       'value="'+listOfLayers[i].getAlias()+'" readonly>'
          + '</div>'
        break;
      case "Vector":
        // Create layer row
        toc +=  '<div class="input-group">'
          +     '<span class="input-group-addon">'
          +       '<input type="checkbox" '
          +       'name="'+listOfLayers[i].getName()+'" '
          +       'id="'+listOfLayers[i].getPosition()+'" '
          +       'onchange="changeLayer('+i+')" '
          +       check + '>'
          +     '</span>'
          +   '<input type="text" class="form-control" '
          +       'value="'+listOfLayers[i].getAlias()+'" readonly>'
          + '</div>'
        break;
        alert(toc);
      default:
        // Nothing
        break;
    }

    // Test if it's not the latest layer
    if (i!=listOfLayers.length-1) {
      // Test if we need to close category
      if (listOfLayers[i].getCategory()!=listOfLayers[i+1].getCategory()) {
        toc += '</div></div>';
      };
    } else{
      toc += '</div></div>';
    };

  };

  // Write to the HTML div
  $("#"+TOC_DIV_CONTENT+"").html(toc).trigger("create");

} 
//end loadToc (listOfLayers)

function changeLayer(i){
  if (mapLayers[i].getCheck()) {
    map.removeLayer(mapLayers[i].getContent());
    mapLayers[i].setCheck(false);
  } else {
    map.addLayer(mapLayers[i].getContent());
    mapLayers[i].setCheck(true);
  };
    
  
}

/**
 * Initialize map configuration.
 * Load all Default Map component
 --------------------------------------------------------------------------- */
function init () {

  //--- Load default Map ------
  map = L.map('map',{
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM
  });

  //--- Load Layers ------
  mapLayers = [];
  mapLayers = getMapLayers();

  //--- Add Layers
  for (var i = 0; i < mapLayers.length; i++) {
    if (mapLayers[i].getCheck()) {
      map.addLayer(mapLayers[i].getContent());
    };
  };

  //--- Load Sidebar Component ------
  var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: 'left'
  });
  map.addControl(sidebar);

  //--- Load Sidebar TOC ------
  loadToc(map, mapLayers);

  //--- Load Buttons ------
  L.easyButton( '<span class="easy-button">&equiv;</span>', function(){
    sidebar.toggle(); // Open-Close sidebar
  }).addTo(map);

  L.easyButton(
    '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>',
    function(){
      map.removeLayer(mapLayers[0].getContent());
    }
  ).addTo(map);

} //end init()

/* ============================================================================
 * MAIN
 * ========================================================================= */

$(document).ready(function(){
  init();
})