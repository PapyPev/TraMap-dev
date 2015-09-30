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
    console.log("getCategory: " + this.category);
    return this.category;
};

/**
 * Get Layer's Name.
 *
 * @this {Layer}
 * @return {name} The name of layer.
 */
Layer.prototype.getName = function(){
    console.log("getName: " + this.name);
    return this.name;
};

/**
 * Get Layer's Alias.
 *
 * @this {Layer}
 * @return {alias} The alias of layer.
 */
Layer.prototype.getAlias = function(){
    console.log("getAlias: " + this.alias);
    return this.alias;
};

/**
 * Get Layer's Position.
 *
 * @this {Layer}
 * @return {position} The position of layer.
 */
Layer.prototype.getPosition = function(){
    console.log("getPosition: " + this.position);
    return this.position;
};

/**
 * Get Layer's Check.
 *
 * @this {Layer}
 * @return {checked} The checked of layer.
 */
Layer.prototype.getCheck = function(){
    console.log("getCheck: " + this.checked);
    return this.checked;
};

/**
 * Get Layer's Content.
 *
 * @this {Layer}
 * @return {content} The content of layer.
 */
Layer.prototype.getContent = function(){
    console.log("getContent: " + this.content);
    return this.content;
};

/* ======================================================================================
 * METHOD
 * =================================================================================== */

Layer.prototype.toString = function() {



    console.log(JSON.stringify(jsonToLog));
}


