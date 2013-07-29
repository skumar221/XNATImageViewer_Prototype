//******************************************************
//  
//******************************************************
goog.provide('utils.css.absolutePosition');

utils.css.absolutePosition = function ( elt) {

	return elt.getBoundingClientRect();
	
}
goog.exportSymbol('utils.css.absolutePosition', utils.css.absolutePosition);
