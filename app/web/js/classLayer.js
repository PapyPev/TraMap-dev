/** ***************************************************************************
 * Layer Class.
 *
 * @author Pev
 * @version 1.0
 *************************************************************************** */

/* ============================================================================
 * CONSTRUCTOR
 * ========================================================================= */

/**
 * Creates an instance of Layer.
 *
 * @constructor
 * @this {Layers}
 * @param {string} type The type of layer (Radio, Checkbox).
 * @param {string} cat The category of layer.
 * @param {string} name The name of layer.
 * @param {string} alias The alias of layer.
 * @param {number} position The postion of layer.
 * @param {boolean} check The default selection of layer.
 * @param {Object} content The layer.
 */
function Layer(type, category, name, alias, position, checked, content) {
    /** @private */ this.type = type;
    /** @private */ this.category = category;
    /** @private */ this.name = name;
    /** @private */ this.alias = alias;
    /** @private */ this.position = position;
    /** @private */ this.checked = checked;
    /** @private */ this.content = content;

    var attributesToLog = [{
        category: category, 
        name: name,
        alias: alias,
        position: position,
        checked:  checked,
        content: content
    }];
    console.log('classLayer.Layer(' + name + ')');
    console.log(attributesToLog);
}

/* ============================================================================
 * GETTERS
 * ========================================================================= */

/**
 * Get Layer's Type.
 *
 * @this {Layer}
 * @return {string} The type of layer.
 */
Layer.prototype.getType = function(){
    console.log("classLayer.getCategory(): " + this.type);
    return this.type;
};

/**
 * Get Layer's Category.
 *
 * @this {Layer}
 * @return {string} The category of layer.
 */
Layer.prototype.getCategory = function(){
    console.log("classLayer.getCategory(): " + this.category);
    return this.category;
};

/**
 * Get Layer's Name.
 *
 * @this {Layer}
 * @return {string} The name of layer.
 */
Layer.prototype.getName = function(){
    console.log("classLayer.getName(): " + this.name);
    return this.name;
};

/**
 * Get Layer's Alias.
 *
 * @this {Layer}
 * @return {string} The alias of layer.
 */
Layer.prototype.getAlias = function(){
    console.log("classLayer.getAlias(): " + this.alias);
    return this.alias;
};

/**
 * Get Layer's Position.
 *
 * @this {Layer}
 * @return {number} The position of layer.
 */
Layer.prototype.getPosition = function(){
    console.log("classLayer.getPosition(): " + this.position);
    return this.position;
};

/**
 * Get Layer's Check.
 *
 * @this {Layer}
 * @return {boolean} The checked of layer.
 */
Layer.prototype.getCheck = function(){
    console.log("classLayer.getCheck(): " + this.checked);
    return this.checked;
};

/**
 * Get Layer's Content.
 *
 * @this {Layer}
 * @return {Object} The content of layer.
 */
Layer.prototype.getContent = function(){
    console.log("classLayer.getContent(): " + this.content);
    return this.content;
};
/* ============================================================================
 * SETERS
 * ========================================================================= */
 /**
 * Set Layer's Checked.
 *
 * @this {Layer}
 * @param {Boolean} check Boolean for check.  
 */
 Layer.prototype.setCheck = function(check){
    this.checked = check;
    console.log("classLayer.setCheck(): " + this.checked);
};

/* ============================================================================
 * METHODS
 * ========================================================================= */

/**
 * Find a String representation of the Layer
 * 
 * @overide
 * @this{Layer}
 * @return {string} Human-readable representation of this Layer.
 */
Layer.prototype.toString = function() {
	var attributesToLog = [{
        category: this.category, 
        name: this.name,
        alias: this.alias,
        position: this.position,
        checked:  this.checked,
        content: this.content
    }];
    console.log("classLayer.toString():")
    console.log(attributesToLog);
    return JSON.stringify(attributesToLog)
}



