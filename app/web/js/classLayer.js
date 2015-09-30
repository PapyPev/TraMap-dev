/** *************************************************************************************
 * Layer Class.
 *
 * @author Pev
 * @version 1.0
 ************************************************************************************* */

/* ======================================================================================
 * CONSTRUCTOR
 * =================================================================================== */
/**
 * Creates an instance of Layer.
 *
 * @constructor
 * @this {Layers}
 * @param {category} cat The category of layer.
 * @param {name} name The name of layer.
 * @param {alias} alias The alias of layer.
 * @param {position} position The postion of layer.
 * @param {checked} check The default selection of layer.
 * @param {content} content The layer.
 */
function Layer(category, name, alias, position, checked, content) {
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
    console.log("classLayer:")
    console.log(attributesToLog);
}

/* ======================================================================================
 * GETTERS
 * =================================================================================== */

/**
 * Get Layer's Category.
 *
 * @this {Layer}
 * @return {category} The category of layer.
 */
Layer.prototype.getCategory = function(){
    console.log("Layer.prototype.getCategory(): " + this.category);
    return this.category;
};

/**
 * Get Layer's Name.
 *
 * @this {Layer}
 * @return {name} The name of layer.
 */
Layer.prototype.getName = function(){
    console.log("Layer.prototype.getName(): " + this.name);
    return this.name;
};

/**
 * Get Layer's Alias.
 *
 * @this {Layer}
 * @return {alias} The alias of layer.
 */
Layer.prototype.getAlias = function(){
    console.log("Layer.prototype.getAlias(): " + this.alias);
    return this.alias;
};

/**
 * Get Layer's Position.
 *
 * @this {Layer}
 * @return {position} The position of layer.
 */
Layer.prototype.getPosition = function(){
    console.log("Layer.prototype.getPosition(): " + this.position);
    return this.position;
};

/**
 * Get Layer's Check.
 *
 * @this {Layer}
 * @return {checked} The checked of layer.
 */
Layer.prototype.getCheck = function(){
    console.log("Layer.prototype.getCheck(): " + this.checked);
    return this.checked;
};

/**
 * Get Layer's Content.
 *
 * @this {Layer}
 * @return {content} The content of layer.
 */
Layer.prototype.getContent = function(){
    console.log("Layer.prototype.getContent(): " + this.content);
    return this.content;
};

/* ======================================================================================
 * METHOD
 * =================================================================================== */

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
    console.log("Layer.prototype.toString():")
    console.log(attributesToLog);
    return JSON.stringify(attributesToLog)
}


