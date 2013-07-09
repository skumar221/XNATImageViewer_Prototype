//******************************************************
//  
//******************************************************
goog.provide('utils.fx.fadeIn');

utils.fx.fadeIn = function (element, time, callback) {

	utils.fx.fadeTo(element, time, 1, callback);
	
}

goog.exportSymbol('utils.fx.fadeIn', utils.fx.fadeIn);