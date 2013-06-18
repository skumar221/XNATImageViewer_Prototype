//******************************************************
//  Returns an element based on the given parameters.
//******************************************************

goog.require('goog.dom');
goog.require('goog.style');

utils.dom.makeElement = function (type, parent, id, css) {
	if (!type) {
		throw Error("Make Element: Need more parameters to make element! -- invalid type");
	}
	
	if (!parent) {
		throw Error("Make Element: Need more parameters to make element -- invalid parent.");
	}

	var attrs = {};
	if (id) {
		attrs['id'] = id;
	}
  
 
	var e = goog.dom.createDom(type, attrs);
	
	
	
	if (css) {
		var newCSS = utils.css.processCSSObject(css);
		goog.style.setStyle(e, newCSS);
	}
	
	goog.dom.appendChild(parent, e);
	
  return e;
}
