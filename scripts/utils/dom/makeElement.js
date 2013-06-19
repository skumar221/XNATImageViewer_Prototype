//******************************************************
//  Returns an element based on the given parameters.
//******************************************************

goog.require('goog.dom');
goog.require('goog.style');

utils.dom.makeElement = function (type, parent, id, css) {
	
	if (!type) {
		throw Error("utils.dom.makeElement: Cannot make element without a valid type.");
	}
	
	if (!parent) {
		throw Error("utils.dom.makeElement: Cannot make element without a valid parent. It currently is: ", parent);
	}

	var e = document.createElement(type);

	if (id) {
		e.id = id;
	}		
	
	if (css) {
		utils.css.setCSS(e, css);		
	}
	
	parent.appendChild(e);
	
  return e;
}
