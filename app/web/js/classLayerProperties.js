/*
|------------------------------------------------------------------------------
| Class Layer Properties
|------------------------------------------------------------------------------
|
| This class contains all Layer properties and functions.
|
| @author Pev
| @verion 1.2
|
|------------------------------------------------------------------------------
*/

// ============================================================================
// CONSTRUCTOR
// ============================================================================

/**
 * Creates an instance of LayerProperties.
 * @constructor
 * @this {LayerProperties}
 * @param {string} type The type of layer (Radio, Checkbox).
 * @param {string} cat The category of layer.
 * @param {string} name The name of layer.
 * @param {string} alias The alias of layer.
 * @param {number} position The postion of layer.
 * @param {boolean} checked The default selection of layer.
 * @param {string} url The GeoServer URL for this layer.
 * @param {Object} content The layer.
 */
function LayerProperties(type, category, name, alias, position, checked, url, content) {

  /** @private */ this.type = type;
  /** @private */ this.category = category;
  /** @private */ this.name = name;
  /** @private */ this.alias = alias;
  /** @private */ this.position = position;
  /** @private */ this.checked = checked;
  /** @private */ this.url = url;
  /** @private */ this.content = content;

} //-- end LayerProperties(...)

// ============================================================================
// GETTERS
// ============================================================================

/**
 * Get LayerProperties's Type.
 * @this {LayerProperties}
 * @return {string} The type of layer.
 */
LayerProperties.prototype.getType = function(){
  return this.type;
};

// ----------------------------------------------------------------------------

/**
 * Get LayerProperties's Category.
 * @this {LayerProperties}
 * @return {string} The category of layer.
 */
LayerProperties.prototype.getCategory = function(){
  return this.category;
};

// ----------------------------------------------------------------------------

/**
 * Get LayerProperties's Name.
 * @this {LayerProperties}
 * @return {string} The name of layer.
 */
LayerProperties.prototype.getName = function(){
  return this.name;
};

// ----------------------------------------------------------------------------

/**
 * Get LayerProperties's Alias.
 * @this {LayerProperties}
 * @return {string} The alias of layer.
 */
LayerProperties.prototype.getAlias = function(){
  return this.alias;
};

// ----------------------------------------------------------------------------

/**
 * Get LayerProperties's Position.
 * @this {LayerProperties}
 * @return {number} The position of layer.
 */
LayerProperties.prototype.getPosition = function(){
  return this.position;
};

// ----------------------------------------------------------------------------

/**
 * Get LayerProperties's Check.
 * @this {LayerProperties}
 * @return {boolean} The checked of layer.
 */
LayerProperties.prototype.getCheck = function(){
  return this.checked;
};

// ----------------------------------------------------------------------------

/**
 * Get LayerProperties's GeoServer URL.
 * @this {LayerProperties}
 * @return {string} The url layer address.
 */
LayerProperties.prototype.getURL = function(){
  return this.url;
};

// ----------------------------------------------------------------------------

/**
 * Get LayerProperties's Content.
 * @this {LayerProperties}
 * @return {Object} The content of layer.
 */
LayerProperties.prototype.getContent = function(){
  return this.content;
};

// ============================================================================
// SETTERS
// ============================================================================

/**
 * Set LayerProperties's Checked.
 * @this {LayerProperties}
 * @param {Boolean} check Boolean for check.  
 */
LayerProperties.prototype.setCheck = function(check){
  this.checked = check;
};

// ----------------------------------------------------------------------------

/**
 * Set LayerProperties's Content.
 * @this {LayerProperties}
 * @param {Object} content The content of Layer.  
 */
LayerProperties.prototype.setContent = function(content){
  this.content = content;
};

// ============================================================================
// METHODS
// ============================================================================

/**
 * String representation of the LayerProperties
 * @overide
 * @this{LayerProperties}
 * @return {string} Human-readable representation of this LayerProperties.
 */
LayerProperties.prototype.toString = function() {
  var attributesToLog = [{
    category: this.category, 
    name: this.name,
    alias: this.alias,
    position: this.position,
    checked:  this.checked,
    url: this.url,
    content: this.content
  }];
  return JSON.stringify(attributesToLog);
};
