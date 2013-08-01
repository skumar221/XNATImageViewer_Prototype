//******************************************************
//  
//******************************************************
goog.provide('utils.fx.fadeIn');
goog.require('utils.fx');
utils.fx.fadeIn = function (element, time, callback) {

	utils.fx.fadeTo(element, time, 1, callback);
	
}

goog.exportSymbol('utils.fx.fadeIn', utils.fx.fadeIn);