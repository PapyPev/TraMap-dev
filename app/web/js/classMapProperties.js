/** ***************************************************************************
 * MapProperties Class.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

/* ============================================================================
 * CONSTRUCTOR
 * ========================================================================= */

/**
 * Creates an instance of MapProperties.
 *
 * @constructor
 * @this {MapProperties}
 * @param {string} name Map's name
 * @param {string} filePath Path or URL to JSON config file
 */
function MapProperties (name, filePath) {

  // Read configuration file from JSON
  var mapParameters = getMapConfig(filePath);

  /** @private */ this.name = name;
  /** @private */ this.center = mapParameters.center;
  /** @private */ this.zoom = mapParameters.zoom;
  /** @private */ this.projection = mapParameters.projection;
  /** @private */ this.mapboxToken = mapParameters.mabox_token;
  /** @private */ this.sidebarPos = mapParameters.sidebar_pos;
  /** @private */ this.map = L.map(name,{
    center: [mapParameters.center[0], mapParameters.center[1]],
    zoom: mapParameters.zoom
  });

  // Log console
  var attributesToLog = [{
    "name": this.name, 
    "center": this.center,
    "zoom": this.zoom,
    "projection": this.projection,
    "mapboxToken":  this.mapboxToken,
    "sidebarPos": this.sidebarPos,
    "map": this.map
  }];
  console.log('classMapProperties.MapProperties('+name+')');
  console.log(attributesToLog);

};

/* ============================================================================
 * GETTERS
 * ========================================================================= */

/**
 * Get Map's name.
 * @this {MapProperties}
 * @return {string} The map's name.
 */
MapProperties.prototype.getName = function () {
  return this.name;
};

/**
 * Get Map's default center.
 * @this {MapProperties}
 * @return {list} The default map's center.
 */
MapProperties.prototype.getCenter = function () {
  return this.center;
};

/**
 * Get Map's default zoom.
 * @this {MapProperties}
 * @return {number} The default map's zoom.
 */
MapProperties.prototype.getZoom = function () {
  return this.zoom;
};

/**
 * Get Map's default projection.
 * @this {MapProperties}
 * @return {string} The default map's projection.
 */
MapProperties.prototype.getProjection = function () {
  return this.projection;
};

/**
 * Get Mapbox token.
 * @this {MapProperties}
 * @return {string} The MapBox token.
 */
MapProperties.prototype.getMapboxToken = function () {
  return this.mapboxToken;
};

/**
 * Get Map's default sidebar position.
 * @this {MapProperties}
 * @return {string} The sidebar position (left/right).
 */
MapProperties.prototype.getSidebarPos = function () {
  return this.sidebarPos;
};

/**
 * Get Map object.
 * @this {MapProperties}
 * @return {map} The map.
 */
MapProperties.prototype.getMap = function () {
  return this.map;
};

/* ============================================================================
 * SETTERS
 * ========================================================================= */

/**
 * Set Map object.
 * @this {MapProperties}
 * @param {map} The new map
 */
MapProperties.prototype.setMap = function (map) {
  this.map = map;
};

/* ============================================================================
 * METHODS
 * ========================================================================= */

/**
 * String representation of MapProperties
 * @overide
 * @this{MapProperties}
 * @return {string} Human-readable representation of this MapProperties.
 */
MapProperties.prototype.toString = function() {
  var attributesToLog = [{
    name: name, 
    center: [center[0], center[1]],
    zoom: zoom,
    projection: projection,
    mapboxToken:  mapboxToken,
    sidebarPos: sidebarPos,
    map: map
  }];
  console.log('classMapProperties.toString():');
  console.log(attributesToLog);
  return JSON.stringify(attributesToLog)
};

/* ============================================================================
 * FUNCTIONS
 * ========================================================================= */

/**
 * Get Map Configurations from JSON file
 * @param {string} filePath Path to the json file (or url)
 * @return {json} Map configuration : JSON content
 */
function getMapConfig (filePath) {

  // Returned value
  var mapConfig;

  // Get JSON
  $.ajax({
    type: 'GET',
    url: filePath,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){
      mapConfig = data;
    },
    error: function(jqXHR, exception){
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    },
    async: false

  });

  return mapConfig;
};
