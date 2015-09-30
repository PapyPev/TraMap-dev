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

var GEO_SRV = 'http://172.18.138.171/geoserver/ows';
var PROJ = 'EPSG:3857';
var TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ'

var DEFAULT_CENTER = [60.736622, 24.779603];
var DEFAULT_ZOOM = 7;


/* ======================================================================================
 * FUNCTIONS
 * =================================================================================== */


/**
 * Sort layers by category and by position.
 * @return {sortedList} A Layer list sorted by category and position.
 ------------------------------------------------------------------------------------- */
function sortLayers (listOfLayers) {
     
    // Variable to return
    var sortedList = [];

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    var temp = {"type":"FeatureCollection","totalFeatures":1451275,"features":[{"type":"Feature","id":"roads_cr.1","geometry":{"type":"LineString","coordinates":[[14.4363544,50.0486718],[14.4363404,50.0485623]]},"geometry_name":"geometry","properties":{"osm_id":4947,"osm_name":"HorÃ¡Äkova","osm_meta":null,"osm_source_id":703192,"osm_target_id":748349520,"clazz":32,"flags":3,"source":1,"target":383417,"km":0.012216812,"kmh":50,"cost":2.4433623E-4,"reverse_cost":2.4433623E-4,"x1":14.4363544,"y1":50.0486718,"x2":14.4363404,"y2":50.0485623}},{"type":"Feature","id":"roads_cr.2","geometry":{"type":"LineString","coordinates":[[14.4363404,50.0485623],[14.4363075,50.0483872]]},"geometry_name":"geometry","properties":{"osm_id":4947,"osm_name":"HorÃ¡Äkova","osm_meta":null,"osm_source_id":748349520,"osm_target_id":1273338336,"clazz":32,"flags":3,"source":383417,"target":521044,"km":0.019611437,"kmh":50,"cost":3.9222874E-4,"reverse_cost":3.9222874E-4,"x1":14.4363404,"y1":50.0485623,"x2":14.4363075,"y2":50.0483872}},{"type":"Feature","id":"roads_cr.3","geometry":{"type":"LineString","coordinates":[[14.4363075,50.0483872],[14.4362908,50.0482846],[14.4362415,50.047993]]},"geometry_name":"geometry","properties":{"osm_id":4947,"osm_name":"HorÃ¡Äkova","osm_meta":null,"osm_source_id":1273338336,"osm_target_id":2424683216,"clazz":32,"flags":3,"source":521044,"target":2,"km":0.044086013,"kmh":50,"cost":8.817203E-4,"reverse_cost":8.817203E-4,"x1":14.4363075,"y1":50.0483872,"x2":14.4362415,"y2":50.047993}},{"type":"Feature","id":"roads_cr.4","geometry":{"type":"LineString","coordinates":[[14.4298007,50.048601],[14.4299148,50.0486098]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":683618,"osm_target_id":1273323652,"clazz":31,"flags":3,"source":3,"target":157625,"km":0.008205178,"kmh":50,"cost":1.6410356E-4,"reverse_cost":1.6410356E-4,"x1":14.4298007,"y1":50.048601,"x2":14.4299148,"y2":50.0486098}},{"type":"Feature","id":"roads_cr.5","geometry":{"type":"LineString","coordinates":[[14.4299148,50.0486098],[14.4305175,50.0486631],[14.4307737,50.0486857]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323652,"osm_target_id":1273323503,"clazz":31,"flags":3,"source":157625,"target":520933,"km":0.061905302,"kmh":50,"cost":0.001238106,"reverse_cost":0.001238106,"x1":14.4299148,"y1":50.0486098,"x2":14.4307737,"y2":50.0486857}},{"type":"Feature","id":"roads_cr.6","geometry":{"type":"LineString","coordinates":[[14.4307737,50.0486857],[14.4310826,50.0487129]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323503,"osm_target_id":1273323484,"clazz":31,"flags":3,"source":520933,"target":520935,"km":0.02226248,"kmh":50,"cost":4.452496E-4,"reverse_cost":4.452496E-4,"x1":14.4307737,"y1":50.0486857,"x2":14.4310826,"y2":50.0487129}},{"type":"Feature","id":"roads_cr.7","geometry":{"type":"LineString","coordinates":[[14.4310826,50.0487129],[14.4311138,50.0487157]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323484,"osm_target_id":273515531,"clazz":31,"flags":3,"source":520935,"target":59221,"km":0.0022505873,"kmh":50,"cost":4.5011748E-5,"reverse_cost":4.5011748E-5,"x1":14.4310826,"y1":50.0487129,"x2":14.4311138,"y2":50.0487157}},{"type":"Feature","id":"roads_cr.8","geometry":{"type":"LineString","coordinates":[[14.4311138,50.0487157],[14.4315067,50.0487444]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":273515531,"osm_target_id":1273323633,"clazz":31,"flags":3,"source":59221,"target":520929,"km":0.028234914,"kmh":50,"cost":5.646983E-4,"reverse_cost":5.646983E-4,"x1":14.4311138,"y1":50.0487157,"x2":14.4315067,"y2":50.0487444}},{"type":"Feature","id":"roads_cr.9","geometry":{"type":"LineString","coordinates":[[14.4315067,50.0487444],[14.4320021,50.0487807]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":1273323633,"osm_target_id":776032678,"clazz":31,"flags":3,"source":520929,"target":394613,"km":0.03560213,"kmh":50,"cost":7.120426E-4,"reverse_cost":7.120426E-4,"x1":14.4315067,"y1":50.0487444,"x2":14.4320021,"y2":50.0487807}},{"type":"Feature","id":"roads_cr.10","geometry":{"type":"LineString","coordinates":[[14.4320021,50.0487807],[14.4335771,50.0488615]]},"geometry_name":"geometry","properties":{"osm_id":5522,"osm_name":"MilevskÃ¡","osm_meta":null,"osm_source_id":776032678,"osm_target_id":694266,"clazz":31,"flags":3,"source":394613,"target":362903,"km":0.112816654,"kmh":50,"cost":0.0022563331,"reverse_cost":0.0022563331,"x1":14.4320021,"y1":50.0487807,"x2":14.4335771,"y2":50.0488615}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}};
    
    var v1 = new Layer("A", "a1", "a 1", 1, true, temp);
    var v2 = new Layer("A", "a2", "a 2", 2, false, temp);

    var v3 = new Layer("B", "b2", "b 2", 2, true, temp);
    var v4 = new Layer("B", "b1", "b 1", 1, true, temp);

    sortedList.push(v1, v2, v3, v4);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Return value
    return listOfLayers;
 }


/**
 * Load content of Table Of Content (TOC).
 ------------------------------------------------------------------------------------- */
function loadTableOfContent (listOfLayers) {

    // HTML result
    var toc = "";

    // Layers Loop
    for (var i = 0; i < listOfLayers.length; i++) {

        // Test if it's the first category or a new
        if (i==0 || listOfLayers[i].getCategory()!=listOfLayers[i-1].getCategory()) {
            toc += '<div class="panel panel-default">'
                + '<div class="panel-heading">'
                + '    <h6 class="panel-title">'+listOfLayers[i].getCategory()+'</h6>'
                + '</div>'
                + '<div class="panel-body">'
        };

        // Test if checkbox is checked
        var check = "";
        if (listOfLayers[i].getCheck()==true) {check="checked"};

        // Create layer row
        toc +=  '<div class="input-group">'
            +       '<span class="input-group-addon">'
            +           '<input type="checkbox" '
            +           'name="'+listOfLayers[i].getName()+'" '
            +           'id="'+listOfLayers[i].getPosition()+'" '
            +           check + '>'
            +       '</span>'
            +   '<input type="text" class="form-control" value="'+listOfLayers[i].getAlias()+'" readonly>'
            + '</div>'

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

    $("#toc").html(toc).trigger("create");
}


/**
 * Initialize map configuration.
 * Load Tiles, Layers and add Buttons actio
 * ----------------------------------------------------------------------------------- */
function init () {

    /* INIT VARIABLES
     ----------------------------------------- */
    var tocLayers = [];      // All layers from clasLayer for TOC
    var mapLayers = [];      // Only classLayer.content for default MAP


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


    /* LOAD GEOSERVER LAYERS
     ----------------------------------------- */

    var geoserverLayers = [];
    geoserverLayers = getGeoServerLayers(GEO_SRV);

    mapLayers.push(tiles_light);

    for (var i = 0; i < geoserverLayers.length; i++) {
        mapLayers.push(geoserverLayers[i].content);
    };


    /* LOAD MAP CONTENT
     ----------------------------------------- */

    var map = L.map('map',{
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        layers: mapLayers // TODO : Don't work
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

    loadTableOfContent(geoserverLayers);

}

/* ======================================================================================
 * MAIN
 * =================================================================================== */

$(document).ready(function(){
    init();
})
