/** ***************************************************************************
 * Map Loader.
 * Initialize Map content
 *
 * @author Pev
 * @version 4.4
 *************************************************************************** */

/* ============================================================================
 * CONSTANTS
 * ========================================================================= */

MAP_PROP = './config/configMap.json';
GEO_PROP = './config/configGeoServer.json';
CON_PROP = './config/configContent.json';

/* ============================================================================
 * GLOBALS
 * ========================================================================= */

// Current map
var map;

// Properties
var mapProperties;
var geoServerProperties;
var contentProperties;

// Leaflet Map Layers
var mapLayers;

// Sidebar
var sidebar;

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Refresh the existing GeoServer Layers
 * @param {bbox} mapBoundingBox The current bounding box of the map
 --------------------------------------------------------------------------- */
function refreshGeoServerLayers (mapBoundingBox) {
  console.log("actionMapLoader.refreshGeoServerLayers(...)");

  for (var i = 0; i < mapLayers.length; i++) {
    if (mapLayers[i].getCheck()) {

      // Reprojection coordinate system
      var sw = LatLonToMercator(
        mapBoundingBox._southWest.lat,
        mapBoundingBox._southWest.lng
      );
      var ne = LatLonToMercator(
        mapBoundingBox._northEast.lat,
        mapBoundingBox._northEast.lng
      );

      // Create the URL query
      var url = mapLayers[i].getURL() 
        +"&bbox="+sw.X+","+sw.Y+","+ne.X+","+ne.Y;

      // if it's not a Tiles layer
      if (mapLayers[i].getCategory()!='Background') {
        mapLayers[i].getContent().refresh(url);
      };

    }; // end if check
  }; // end for mapLayers
}; //--- end refreshGeoServerLayers (mapBoundingBox)

/**
 * Load and reload GeoServer Layers with Bounding box query
 * @param {boundingBox} mapBoundingBox The bounding box of the current map
 --------------------------------------------------------------------------- */
function loadGeoServerLayers (mapBoundingBox) {
  console.log('actionMapLoader.loadGeoServerLayers(...)');
  console.log(mapBoundingBox);

  // Get GeoServer Layer
  var listGeoServerLayer = [];
  listGeoServerLayer = getGeoServerLayers(
    geoServerProperties.getAddress(), 
    geoServerProperties.getRepository(),
    mapProperties.getProjection(),
    mapProperties.getMaxFeatures(),
    mapBoundingBox
  );

  // Add all GeoServer Layers
  for (var i = 0; i < listGeoServerLayer.length; i++) {
    mapLayers.push(listGeoServerLayer[i]);
    if (listGeoServerLayer[i].getCheck()) {
      map.addLayer(listGeoServerLayer[i].getContent());
    };
  };
}; //--- end loadGeoServerLayers(mapBoundingBox)

/**
 * TOC action on the checkbox or radio button
 * @param {number} i Index of the layer in listOfLayer
 * @param {string} type Type of layer (Radio, Checkbox)
 --------------------------------------------------------------------------- */
function changeLayer (i, type) {
  console.log('actionMapLoader.changeLayer(' 
    + i + ',' + mapLayers[i].getCheck() +') -> ' + mapLayers[i].getName());

  // If the layer is viewable
  if (mapLayers[i].getCheck()) {
    map.removeLayer(mapLayers[i].getContent()); // unload map layer
    mapLayers[i].setCheck(false); // unload TOC layer
  } else {
    map.addLayer(mapLayers[i].getContent()); // load map layer
    mapLayers[i].setCheck(true); // load TOC layer
  }

  // Loop Layers - Remove the other layer
  for (var j = 0; j < mapLayers.length; j++) {
    if (mapLayers[j].getCategory()==mapLayers[i].getCategory()
      && j != i && type=='Radio') {
      mapLayers[j].setCheck(false);
      map.removeLayer(mapLayers[j].getContent());
    };
  };

}; //--- end changeLayer (i)

/**
 * Load content of Table Of Content (TOC).
 --------------------------------------------------------------------------- */
function loadTOC () {
  console.log('actionMapLoader.loadTOC()');

  // Add TOC title and description
  $("#"+contentProperties.getDivTocTitle()+"").html(
    contentProperties.getContentTocTitle()
  ).trigger("create");
  $("#"+contentProperties.getDivTocDescript()+"").html(
    contentProperties.getContentTocDescript()
  ).trigger("create");

  // Prepare TOC content
  var toc = "";

  // Layers Loop
  for (var i = 0; i < mapLayers.length; i++) {

    // Test if it's the first category or a new
    if (i==0 
      || mapLayers[i].getCategory()!=mapLayers[i-1].getCategory()) {
      toc += '<div class="panel panel-default">'
        + '<div class="panel-heading">'
        +   '<h6 class="panel-title">'+mapLayers[i].getCategory()+'</h6>'
        + '</div>'
        + '<div class="panel-body">'
    };

    // Test if checkbox is checked
    var check = "";
    if (mapLayers[i].getCheck()==true) {check="checked"};

    // Test type of data 
    switch(mapLayers[i].getType()){
      case "Radio":
        toc +=  '<div class="input-group">'
          +     '<span class="input-group-addon">'
          +       '<input type="radio" '
          +       'name="'+mapLayers[i].getCategory()+'" '
          +       'id="'+mapLayers[i].getPosition()+'" '
          +       'onclick="changeLayer('+i+',\''
          +           mapLayers[i].getType()+'\')" '
          +       check + '>'
          +     '</span>'
          +   '<input type="text" class="form-control" '
          +       'value="'+mapLayers[i].getAlias()+'" readonly>'
          + '</div>'
        break;
      case "Checkbox":
        // Create layer row
        toc +=  '<div class="input-group">'
          +     '<span class="input-group-addon">'
          +       '<input type="checkbox" '
          +       'name="'+mapLayers[i].getName()+'" '
          +       'id="'+mapLayers[i].getPosition()+'" '
          +        'onchange="changeLayer('+i+',\''
          +           mapLayers[i].getType()+'\')" '
          +       check + '>'
          +     '</span>'
          +   '<input type="text" class="form-control" '
          +       'value="'+mapLayers[i].getAlias()+'" readonly>'
          + '</div>'
        break;
      default:
        // Nothing
        break;
    }

    // Test if it's not the latest layer
    if (i!=mapLayers.length-1) {
      // Test if we need to close category
      if (mapLayers[i].getCategory()!=mapLayers[i+1].getCategory()) {
        toc += '</div></div>';
      };
    } else{
      toc += '</div></div>';
    };

  };

  // Write to the HTML div
  $("#"+contentProperties.getDivTocContent()+"").html(toc).trigger("create");
  // console.log('actionMapLoader.loadToc() [html]');
  // console.log(toc);
}; //--- end loadTOC()

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
 * Load Popup content from JSON file (url)
 * @param {json} data Popup json
 --------------------------------------------------------------------------- */
function loadPopupContent (data) {
  console.log('actionMapLoader.loadPopupContent()');

  // Prepare HTML content
  var html = "";
  
  // Loop object
  for (var i = 0; i < data.content_overTheMap.length; i++) {

    switch(data.content_overTheMap[i].type){

      case 'popup':
        // Init container
        html  += '<div class="modal fade" '
                + 'id="'+data.content_overTheMap[i].name+data.content_overTheMap[i].type+'" tabindex="-1" role="dialog" aria-labelledby="contactLabel">'
                  + '<div class="modal-dialog" role="document">'
                    + '<div class="modal-content">'
        // Content
        html += data.content_overTheMap[i].content;
        // End container
        html += '</div></div></div>';
        // Write on the div
        $("#"+data.div_popup_content+"").html(html).trigger("create");
        break;

      default:
        alert('actionMapLoader.loadPopup : error');
        break;

    }; //end Switch
  }; //end Loop object
} //--- end loadPopup (data)

/**
 * Load all popup contains on JSON file
 --------------------------------------------------------------------------- */
function loadPopup () {
  console.log('actionMapLoader.loadPopup()');

  // Ajax request
  $.ajax({

    // GET Parameters
    type: 'GET',
    url: CON_PROP,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){

      // Load Content Properties
      contentProperties = data;

      // Load HTML Popup content
      loadPopupContent(data);

      // Load Buttons
      for (var i = 0; i < data.content_overTheMap.length; i++) {

        // Get button id
        var title = data.content_overTheMap[i].id.toString();

        // Create and load content and event
        loadPopupEvent(data.content_overTheMap[i].icon, 
          data.content_overTheMap[i].name + data.content_overTheMap[i].type,
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
}; //--- end loadPopup()

/**
 * Add Tiles background to mapLayers
 * @return {array} List of tiles LayerProperties (classLayerProperties).
 --------------------------------------------------------------------------- */
function loadTiles () {
  console.log('actionMapLoader.loadTiles()');

  // Returned value
  listOfLayers = [];

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
    "bgLight", "MapBox : Light", 0, false, "", bgLight);
  var bgDarktM = new LayerProperties("Radio", "Background", 
    "bgDark", "MapBox : Dark", 1, false, "", bgDark);
  var bgStreetM = new LayerProperties("Radio", "Background", 
    "bgStreet", "MapBox : Street", 2, true, "", bgStreet);

  // Add Tiles to default loaded map layers
  listOfLayers.push(bgLightM, bgDarktM, bgStreetM);

  // Return Value
  return listOfLayers;
}; //--- end loadTiles()

/**
 * Loading all the necessary components of the card
 --------------------------------------------------------------------------- */
function init () {
  console.log('actionMapLoader.init()');

  //---------- Load Layers, GeoServer, Content Properties
  mapProperties = new MapProperties('map', MAP_PROP);
  geoServerProperties = new GeoServerProperties(GEO_PROP);
  contentProperties = new ContentProperties(CON_PROP);

  //---------- Load Default map
  map = L.map('map', {
    center: [mapProperties.getCenter()[0], mapProperties.getCenter()[1]],
    zoom: mapProperties.getZoom()
  });

  //---------- Load Default Background to map
  mapLayers = loadTiles();
  for (var i = 0; i < mapLayers.length; i++) {
    if (mapLayers[i].getCheck()) {
      map.addLayer(mapLayers[i].getContent());
    };
  };

  //---------- Load Sidebar Component
  sidebar = L.control.sidebar('sidebar', {
    closeButton: true,
    position: mapProperties.getSidebarPos()
  });
  map.addControl(sidebar);
  //sidebar.show();

  //---------- Load Default GeoServer layer 
  loadGeoServerLayers(map.getBounds());

  //---------- Load TOC
  loadTOC();

  //---------- Load Actions Buttons
  L.easyButton( '<span class="easy-button">&equiv;</span>', 
    function(){
      sidebar.toggle(); // Open-Close sidebar
    }, 'Table of Content'
  ).addTo(map);

  L.easyButton(
    '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>',
    function(){
      buttonSearch();
    }, 'Search'
  ).addTo(map);

  //---------- Load Popup
  loadPopup(sidebar);

  //----------- Moving Map view, refresh GeoServerLayer
  map.on('moveend', function() { 
    refreshGeoServerLayers(map.getBounds());
  });

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