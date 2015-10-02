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

var DEFAULT_CENTER = [50.075537, 14.425112];
var DEFAULT_ZOOM = 7;

var TOC_DIV_TITLE = 'toc-title';
var TOC_DIV_CONTENT = 'toc-content';
var TOC_DIV_DESCRIPT = 'toc-description';

var TOC_TITLE = 'toc-title';
var TOC_CONTENT = 'toc-content';
var TOC_DESCRIPT = 'toc-description';

var POPUP = [
  ['contact', 'glyphicon-envelope'], 
  ['informations', 'glyphicon-info-sign']
];

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
  var bgDark = L.tileLayer(mbUrl, {
    id: 'mapbox.dark', 
    attribution: tiles_copyright
  })
  var bgStreet = L.tileLayer(mbUrl, {
    id: 'mapbox.streets', 
    attribution: tiles_copyright
  });

  // Create metadata layer
  var bgLightM = new Layer("Radio", "Background", 
    "bgLight", "MapBox : Light", 0, true, bgLight);
  var bgDarktM = new Layer("Radio", "Background", 
    "bgDark", "MapBox : Dark", 1, false, bgDark);
  var bgStreetM = new Layer("Radio", "Background", 
    "bgStreet", "MapBox : Street", 2, false, bgStreet);

  // Add Tiles to default loaded map layers
  listOfLayers.push(bgLightM, bgDarktM, bgStreetM);


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
      case "Radio":
        toc +=  '<div class="input-group">'
          +     '<span class="input-group-addon">'
          +       '<input type="radio" '
          +       'name="'+listOfLayers[i].getCategory()+'" '
          +       'id="'+listOfLayers[i].getPosition()+'" '
          +       'onclick="changeLayer('+i+',\''
          +           listOfLayers[i].getType()+'\')" '
          +       check + '>'
          +     '</span>'
          +   '<input type="text" class="form-control" '
          +       'value="'+listOfLayers[i].getAlias()+'" readonly>'
          + '</div>'
        break;
      case "Checkbox":
        // Create layer row
        toc +=  '<div class="input-group">'
          +     '<span class="input-group-addon">'
          +       '<input type="checkbox" '
          +       'name="'+listOfLayers[i].getName()+'" '
          +       'id="'+listOfLayers[i].getPosition()+'" '
          +        'onchange="changeLayer('+i+',\''
          +           listOfLayers[i].getType()+'\')" '
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

};  //end loadToc (listOfLayers)

/**
 * TOC action on the checkbox or radio button
 * @param {number} i Index of the layer in listOfLayer
 * @param {string} type Type of layer (Radio, Checkbox)
 --------------------------------------------------------------------------- */
function changeLayer (i, type) {

  console.log('actionMapLoader.changeLayer(' 
    + i + ',' + mapLayers[i].getType() +') -> ' + mapLayers[i].getName());

  // If the layer is viewable
  if (mapLayers[i].getCheck()) {
    map.removeLayer(mapLayers[i].getContent()); // unload map layer
    mapLayers[i].setCheck(false); // unload TOC layer
  } else {
    map.addLayer(mapLayers[i].getContent()); // load map layer
    mapLayers[i].setCheck(true); // load TOC layer
  }

  for (var j = 0; j < mapLayers.length; j++) {
    if (mapLayers[j].getCategory()==mapLayers[i].getCategory()
      && j != i) {
      mapLayers[j].setCheck(false);
      map.removeLayer(mapLayers[j].getContent());
    };
  };

}; //--- end changeLayer (i)

/**
 * Open a Popup over the map after close the sidebar
 * @param {string} type Type of the Popup
 * @param {sidebar} sidebar The TOC sidebar
 --------------------------------------------------------------------------- */
function openPopup (type, sidebar) {

  // Close the sidebar
  sidebar.hide();

  // Action per type
  switch(type){
    case 'contact':
      $('#contactPopup').modal('show');
      break;
    case 'informations':
      $('#informationsPopup').modal('show');
      break;
    case 'search':
      $('#searchPopup').modal('show');
      break;
    default:
      alert(type);
      break;
  }

};

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
  endIndexBaseLayers = mapLayers.length - 1;

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
      alert("searchButton");
      console.log("searchButton");
    }
  ).addTo(map);

  //--- Load Popup Content ------

  loadPopup(POPUP);
  
  for (var j = 0; j < POPUP.length; j++) {
    L.easyButton(
      '<span class="glyphicon '+POPUP[j][1]+'" id="'+j+'Span" aria-hidden="true"></span>',
      function(){
        // TODO : Finish it 
        openPopup(POPUP[1][0], sidebar);
        console.log(POPUP[1][0] + "Popup");
      }
    ).addTo(map);
  };

}; //---end init()


/* ============================================================================
 * MAIN
 * ========================================================================= */

$(document).ready(function(){
  init();
});