//******************************************************
//  Returns an element based on the given parameters.
//******************************************************
goog.provide('utils.dom.makeElement');

utils.dom.makeElement = function (type, parent, className, css) {
	
	if (!type) {
		throw Error("utils.dom.makeElement: Cannot make element without a valid type.");
	}
	
	if (!parent) {
		utils.dom.debug(parent);
		utils.dom.debug(type);
		utils.dom.debug(className);
		throw Error("utils.dom.makeElement: Cannot make element without a valid parent.");
	}

	var e = document.createElement(type);


	e.id = className + "_" + utils.dom.uniqueId();
	
	utils.dom.addClass(e, className);
	
	
	
	if (css) {
		utils.css.setCSS(e, css);		
	}
	
	parent.appendChild(e);
	
  return e;
}

goog.exportSymbol('utils.dom.makeElement', utils.dom.makeElement);
