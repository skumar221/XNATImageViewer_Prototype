//******************************************************
//  Returns an element based on the given parameters.
//******************************************************
goog.require('utils.dom');
goog.require('utils.dom.debug');
goog.require('utils.dom.uniqueId');

goog.require('utils.dom.addClass');

goog.provide('utils.dom.makeElement');
utils.dom.makeElement = function (type, parent, className, css) {
	
	if (!type) {
		throw Error("utils.dom.makeElement: Cannot make element without a valid type.");
	}
	
	if (!parent) {
		utils.dom.debug("utils.dom.makeElement: ", parent);
		utils.dom.debug("utils.dom.makeElement: ", type);
		utils.dom.debug("utils.dom.makeElement: ", className);
		//throw Error("utils.dom.makeElement: Cannot make element without a valid parent.");
	}

	var e = document.createElement(type);


	e.id = className + "_" + utils.dom.uniqueId();
	
	utils.dom.addClass(e, className);
	
	
	
	if (css) {
		utils.css.setCSS(e, css);		
	}
	
	parent && parent.appendChild(e);
	
  return e;
}

goog.exportSymbol('utils.dom.makeElement', utils.dom.makeElement);
