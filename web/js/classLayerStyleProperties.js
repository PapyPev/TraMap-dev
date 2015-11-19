/*
|------------------------------------------------------------------------------
| Class Layer Style Properties
|------------------------------------------------------------------------------
|
| This class contains all Layer properties and functions.
|
| @author Pev
| @verion 1.0.0
|
|------------------------------------------------------------------------------
*/

// ============================================================================
// CONSTRUCTOR
// ============================================================================

/**
 * [Creates an instance of LayerStyleProperties]
 * @constructor
 * @this {LayerStyleProperties}
 * @param {String} filePath      [The layer style configuration file]
 */
function LayerStyleProperties(filePath, name) {

  // Read configuration file from JSON
  var fromJson = getLayerStyleConfig(filePath);

  /**
   * [Name of the layer]
   * @type {String}
   * @private
   */
  this.layers = fromJson.layers;

} //-- end LayerStyleProperties(...)

/**
 * [Creates an instance of LayerStyleProperties]
 * @constructor
 * @this {LayerStyleProperties}
 * @param {String} filePath      [The layer style configuration file]
 * @param {String} name      [The layer's name]
 */
function LayerStyleProperties(filePath, name) {

  // Read configuration file from JSON
  var fromJson = getLayerStyleConfig(filePath, name);

  /**
   * [Name of the layer]
   * @type {String}
   * @private
   */
  this.name = fromJson.name

  /**
   * [Type of the layer (point, line, polygon)]
   * @type {String}
   * @private
   */
  this.type = fromJson.type

  /**
   * [If the layer have a specific style filters, If not : just one style]
   * @type {Boolean}
   * @private
   */
  this.filters = fromJson.filters

  /**
   * [If the layer have a specifi style, what kind of filer (bounds, number,
   * words)]
   * @type {String}
   * @private
   */
  this.filters_type = fromJson.filters_type

  /**
   * [List of styles for the layer. The Object depend of type of layer. For
   * all type of layer, style have "zoom_min" and "zoom_max" attributes.]
   * @type {array}
   * @private
   */
  this.styles = fromJson.styles

} //-- end LayerStyleProperties(...)

// ============================================================================
// GETTERS
// ============================================================================

/**
 * [Return the list of layers properties]
 * @return {String} [Layer's name]
 */
LayerStyleProperties.prototype.getLayersStyle = function(){
  return this.layers;
}

/**
 * [Return the name of the layer]
 * @return {String} [Layer's name]
 */
LayerStyleProperties.prototype.getName = function(){
  return this.name;
}

/**
 * [Return the type of the layer (Point, Polygon, Line)]
 * @return {String} [Layer's type]
 */
LayerStyleProperties.prototype.getType = function(){
  return this.type;
}

/**
 * [Return if the layer have filters]
 * @return {Boolean} [If the layer have specifics filters it's true]
 */
LayerStyleProperties.prototype.getFilters = function(){
  return this.filters;
}

/**
 * [If the layer have specifics filters, return the filters type]
 * @return {String} [Filter's type (bounds, number, word)]
 */
LayerStyleProperties.prototype.getFiltersType = function(){
  return this.filters_type;
}

/**
 * [Return the Style object]
 * @return {json} [Object Style properties]
 */
LayerStyleProperties.prototype.getStyles = function(){
  return this.styles;
}


// ============================================================================
// METHODS
// ============================================================================

/**
 * [String representation of the LayerStyleProperties]
 * @overide
 * @this {LayerStyleProperties}
 * @return {String} [Human-readable representation of this
 * LayerStyleProperties]
 */
LayerStyleProperties.prototype.toString = function() {
  var attributesToLog = [{
    name : this.name,
    type : this.type,
    filters : this.filters,
    filters_type : this.filters_type,
    styles : this.styles
  }];
  return JSON.stringify(attributesToLog);
};

// ============================================================================
// FUNCTIONS
// ============================================================================

/**
 * [Get GeoServer Configurations from JSON file]
 * @this {LayerStyleProperties}
 * @param  {String} filePath [Path to the json file (or url)]
 * @return {json}          [Content configuration : JSON content]
 */
function getLayerStyleConfig (filePath, name) {

  // Returned value
  var layerStyleConfig;

  // Get JSON
  $.ajax({
    type: 'GET',
    url: filePath,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){

      layerStyleConfig = data;

    },
    error: function(jqXHR, exception){
      console.warn("failde")
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    },
    async: false

  });

  return layerStyleConfig;
} //-- end getContentConfig (filePath)

/**
 * [Get GeoServer Configurations from JSON file]
 * @this {LayerStyleProperties}
 * @param  {String} filePath [Path to the json file (or url)]
 * @return {json}          [Content configuration : JSON content]
 */
function getLayerStyleConfig (filePath, name) {

  // Returned value
  var layerStyleConfig;

  // Get JSON
  $.ajax({
    type: 'GET',
    url: filePath,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){

      console.warn("data")

      for (var i = data.layers.length - 1; i >= 0; i--) {
        if (data.layers[i].name === name) {
          layerStyleConfig = data.layers[i];
          break;
        }
      }

      console.log(layerStyleConfig);

    },
    error: function(jqXHR, exception){
      console.warn("failde")
      if (jqXHR.status === 401) {
        console.log('HTTP Error 401 Unauthorized.');
      } else {
        console.log('Uncaught Error.\n' + jqXHR.responseText);
      }
    },
    async: false

  });

  return layerStyleConfig;
} //-- end getContentConfig (filePath)
