//******************************************************
//  Returns an element based on the given parameters.
//******************************************************
utils.dom.makeElement = function (type, parent, id, css) {
	if (!type) {
		throw "Make Element: Need more parameters to make element! -- invalid type";
	}
	
	if (!parent) {
		throw "Make Element: Need more parameters to make element -- invalid parent.";
	}
	
  var e = document.createElement(type);
  
  if (id) 
  	e.setAttribute("id", id);
  if (parent)
  	parent.appendChild(e);
  
  if (css) {
  	  utils.css.setCSS(e, css);	
  }
  return e;
}
