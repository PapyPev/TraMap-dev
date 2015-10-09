/** ***************************************************************************
 * Map Loader.
 * Initialize Map content
 *
 * @author Pev
 * @version 3.0
 *************************************************************************** */

/* ============================================================================
 * CONSTANTS
 * ========================================================================= */

// Geoserver parameters
var GEO_SRV = 'http://172.18.138.171/geoserver';
var GEO_REPO = 'hamk-map-project';
var GEO_USER = 'admin';
var GEO_PASS = 'geoserver';

// Default Map projection
var PROJ = 'epsg:4326'; //LatLong
// MapBox Token for 
var TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'

// Default Map center
var DEFAULT_CENTER = [60.631808, 24.857865];
// Default Zoom scale
var DEFAULT_ZOOM = 10;

// Div (on index.html) will receive TOC and popup content
var TOC_DIV_TITLE = 'toc-title';
var TOC_DIV_CONTENT = 'toc-content';
var TOC_DIV_DESCRIPT = 'toc-description';
var POPUP_DIV_CONTENT = 'popup-content';

// TOC title content
var TOC_TITLE = 'Layers';
var TOC_DESCRIPT = 'Hamk-map-project';

// Side bar position
var SIDEBAR_POS = 'left';

// JSON Popup file
var POPUP_JSON = './js/contentPopup.json';


/* ============================================================================
 * GLOBALS
 * ========================================================================= */

// Leaflet Map container
var map;

// Leaflet Map Layers
var mapLayers;

// Leaflet Map Bounding box
var mapBoundingBox;


/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Recovery of all data sources.
 * @return {array} List of Layer (classLayer).
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
    "bgLight", "MapBox : Light", 0, false, bgLight);
  var bgDarktM = new Layer("Radio", "Background", 
    "bgDark", "MapBox : Dark", 1, false, bgDark);
  var bgStreetM = new Layer("Radio", "Background", 
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
 * Load content of Table Of Content (TOC).
 * @param {map} map Current leaflet Map
 * @param {list} listOfLayers A sorted list of classLayer
 --------------------------------------------------------------------------- */
function loadToc (map, listOfLayers) {
  console.log('actionMapLoader.loadToc(map, listOfLayers)');

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
  console.log('actionMapLoader.loadToc() [html]');
  console.log(toc);
}; //--- end loadToc (map, listOfLayers)

/**
 * Load Popup content from JSON file (url)
 * @param {json} data Popup json
 --------------------------------------------------------------------------- */
function loadPopup (data) {
  console.log('actionMapLoader.loadPopup()');

  // Prepare HTML content
  var html = "";
  
  // Loop object
  for (var i = 0; i < data.overTheMap.length; i++) {

    switch(data.overTheMap[i].type){

      case 'popup':
        // Init container
        html  += '<div class="modal fade" '
                + 'id="'+data.overTheMap[i].name+data.overTheMap[i].type+'" tabindex="-1" role="dialog" aria-labelledby="contactLabel">'
                  + '<div class="modal-dialog" role="document">'
                    + '<div class="modal-content">'
        // Content
        html += data.overTheMap[i].content;
        // End container
        html += '</div></div></div>'
        // Write on the div
        $("#"+POPUP_DIV_CONTENT+"").html(html).trigger("create");
        break;

      default:
        alert('actionMapLoader.loadPopup : error');
        break;

    }; //end Switch
  }; //end Loop object
} //--- end loadPopup (url)

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
  // Loop Layers
  for (var j = 0; j < mapLayers.length; j++) {
    if (mapLayers[j].getCategory()==mapLayers[i].getCategory()
      && j != i) {
      mapLayers[j].setCheck(false);
      map.removeLayer(mapLayers[j].getContent());
    };
  };
}; //--- end changeLayer (i)

/**
 * Create button and load popup content onclick
 * @param {string} glyph Icon on the button
 * @param {string} popupName Name of the popup container (name+type)
 * @param {sidebar} sidebar TOC content will hide on event
 --------------------------------------------------------------------------- */
function loadPopupEvent (glyph, popupName, sidebar) {
  console.log('actionMapLoader.loadPopupEvent(' 
    + glyph + ','+popupName+','+sidebar+')');
  L.easyButton(
    '<span class="glyphicon '+glyph+'" aria-hidden="true"></span>',
    function(){
      sidebar.hide(); // close sidebar
      $('#'+popupName).modal('show'); // load content
      console.log('actionMapLoader.loadPopupEvent(...) #'+popupName);
    }, popupName // For event
  ).addTo(map);
} //--- loadPopupEvent (glyph, popupName, sidebar)

/**
 * Loading all the necessary components of the card
 --------------------------------------------------------------------------- */
function init () {
  console.log('actionMapLoader.init()');

  //---------- Load default Map
  map = L.map('map',{
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM
  });

  //---------- Load Layers (classLayer)
  mapLayers = [];
  mapLayers = getMapLayers();

  //---------- Add Layers (leaflet) to List
  for (var i = 0; i < mapLayers.length; i++) {
    if (mapLayers[i].getCheck()) {
      map.addLayer(mapLayers[i].getContent());
    };
  };

  //---------- Determine map bounding box
  mapBoundingBox = map.getBounds().toBBoxString();
  alert(mapBoundingBox);

  //---------- Load Sidebar Component
  var sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: SIDEBAR_POS
  });
  map.addControl(sidebar);

  //---------- Load Sidebar TOC
  loadToc(map, mapLayers);

  //---------- Load Actions Buttons
  L.easyButton( '<span class="easy-button">&equiv;</span>', 
    function(){
      sidebar.toggle(); // Open-Close sidebar
    }, 'Table of Content'
  ).addTo(map);

  L.easyButton(
    '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>',
    function(){
      alert("searchButton");
      console.log("searchButton");
    }, 'Search'
  ).addTo(map);

  //---------- Load Popup Buttons
  // Ajax request
  var test = $.ajax({

    // GET Parameters
    type: 'GET',
    url: POPUP_JSON,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){

      // Load HTML Popup content
      loadPopup(data);

      // Load Buttons
      for (var i = 0; i < data.overTheMap.length; i++) {

        // Get button id
        var title = data.overTheMap[i].id.toString();

        // Create and load content and event
        loadPopupEvent(data.overTheMap[i].icon, 
          data.overTheMap[i].name + data.overTheMap[i].type,
          sidebar);

      }; // end loop 
    },
    error: function(jqXHR, exception){
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    }

  });

  map.on('moveend', function() { 
    mapBoundingBox = map.getBounds().toBBoxString();
    alert(map.getBounds());
    // READ : http://stackoverflow.com/questions/15440216/update-leaflet-geojson-layer-with-data-inside-bounding-box
  });

}; //--- end init ()

/* ============================================================================
 * MAIN
 * ========================================================================= */

/**
 * Action performed when the page is fully loaded
 --------------------------------------------------------------------------- */
$(document).ready(function(){
  init();
}); //--$(document).ready()

