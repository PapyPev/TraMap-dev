/** *************************************************************************************
 * Map Loader.
 * Initialize Map content
 *
 * @author Pev
 * @version 2.1
 ************************************************************************************* */


/* ======================================================================================
 * CONSTANTS
 * =================================================================================== */

var GEO_SRV = 'http://172.18.138.171/geoserver';
var PROJ = 'EPSG:3857';
var TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'

var DEFAULT_CENTER = [60.736622, 24.779603];
var DEFAULT_ZOOM = 7;


/* ======================================================================================
 * FUNCTIONS
 * =================================================================================== */

/**
 * Initialize map configuration.
 * Load Tiles, Layers and add Buttons actio
 * ----------------------------------------------------------------------------------- */
function init () {

    /* INIT VARIABLES
     ----------------------------------------- */
    var tocLayers = [] // Layers by Category
    var listLayers = [] // List of all layers

    var test = new Layer("category", "name", "alias", 1, true, "content");
    

    /* LOAD BACKGROUND
     ----------------------------------------- */

    // Create Copyright
    var tiles_copyright = 'Map data &copy;' 
        + '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' 
        + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' 
        + 'Imagery © <a href="http://mapbox.com">Mapbox</a>'

    // Get tiles sources
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?'
        +'access_token=' + TOKEN;

    //Create Tiles layers
    var tiles_light = L.tileLayer(mbUrl, {
        id: 'mapbox.light', 
        attribution: tiles_copyright
    })
    var tiles_street = L.tileLayer(mbUrl, {
        id: 'mapbox.streets', 
        attribution: tiles_copyright
    });

    // Add to TOC and LIST
    listLayers.push(tiles_light);
    listLayers.push(tiles_street);


    /* LOAD GEOSERVER LAYERS
     ----------------------------------------- */
    var geoserverLayers = [];
    geoserverLayers = getGeoServerLayers(GEO_SRV);


    /* LOAD MAP CONTENT
     ----------------------------------------- */

    var map = L.map('map',{
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        layers: [tiles_street,geoserverLayers[0]]
    });

    
    /* SIDEBAR CONTROL
     ----------------------------------------- */

    var sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'left'
    });
    map.addControl(sidebar);


    /* BUTTONS CONTROL
     ----------------------------------------- */

    L.easyButton( '<span class="easy-button">&equiv;</span>', function(){
        sidebar.toggle(); // OpenSidebar
    }).addTo(map);

    L.easyButton( '<span class="glyphicon glyphicon-search" aria-hidden="true"></span>', function(){
        alert('search');
    }).addTo(map);

}

/* ======================================================================================
 * MAIN
 * =================================================================================== */

$(document).ready(function(){
    init();
})
