

//******************************************************
//  Debate about whether or not to use jQuery CSS methods or not
//
//******************************************************
goog.provide('utils.css.setCSS');
goog.require('goog.style');

utils.css.setCSS = function (elt, cssObj) {

	if (!elt || !cssObj) { return; }
	if (!elt.style) { elt.style = {} }


	//
	// GOOGLE
	//
	goog.style.setStyle(elt, cssObj);
	
	
	//
	// Numerical
	//
	var arr = ["top", "left", "height", "width", "fontSize", "borderWidth", "borderRadius"]
	utils.array.forEach(arr, function(dim) { 
		if (cssObj[dim]) {
			elt.style[dim] = (typeof cssObj[dim] === 'number') ? 
				utils.convert.px(cssObj[dim]) : cssObj[dim];
		}
	})


}
goog.exportSymbol('utils.css.setCSS', utils.css.setCSS);