/** *************************************************************************************
 * Map Loader.
 * Initialize Map content
 *
 * @author Pev
 * @version 2.0
 ************************************************************************************* */

/**
 * TODO : Make some documentation
 */
function init () {
    

    /* CONSTANTS
     ************************************************************************************* */

    var GEO_SRV = 'http://172.18.138.171/geoserver';
    var PROJ = 'EPSG:3857';
    var TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'

    /* LOAD DATA
     ************************************************************************************* */

    // Initialize LayerGroups
    var point_riihimaki = new L.LayerGroup();
    var point_helsinki = new L.LayerGroup();


    // Add data to LayerGroups
    L.marker([60.736622, 24.779603]).bindPopup('Riihimäki').addTo(point_riihimaki).on('click', 
        function () {
            // Open Sidebar
            sidebar.toggle();
        }
    );;
    L.marker([60.173484, 24.941046]).bindPopup('Helsinki').addTo(point_helsinki);


    /* LOAD BACKGROUND
     ************************************************************************************* */

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

    /* CREATE MAP
     ************************************************************************************* */

    var map = L.map('map',{
        center: [60.736622, 24.779603],
        zoom: 7,
        layers: [tiles_street, point_riihimaki]
    });
    //map.setView([51.2, 7], 9);

    /* ADD TOC
     ************************************************************************************* */

    // Create base Layer for background
    var baseLayers = {
        "Light": tiles_light,
        "Streets": tiles_street
    };

    // Create checkbox
    var overlays = {
        "Riihimaki": point_riihimaki,
        "Helsinki": point_helsinki
    };

    L.control.layers(baseLayers, overlays).addTo(map);

    /* SIDEBAR CONTROL
     ************************************************************************************* */

    var sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'left'
    });
    map.addControl(sidebar);

    setTimeout(function () {
        sidebar.show();
    }, 500);

    map.on('click', function () {
        sidebar.hide();
    })

    sidebar.on('show', function () {
        console.log('Sidebar will be visible.');
    });

    sidebar.on('shown', function () {
        console.log('Sidebar is visible.');
    });

    sidebar.on('hide', function () {
        console.log('Sidebar will be hidden.');
    });

    sidebar.on('hidden', function () {
        console.log('Sidebar is hidden.');
    });

    L.DomEvent.on(sidebar.getCloseButton(), 'click', function () {
        console.log('Close button clicked.');
    });
    
}


$(document).ready(function(){

    // TODO : Comment
    init();

})
