


//******************************************************
//  
//******************************************************
goog.provide('utils.fx.fadeOut');

utils.fx.fadeOut = function (element, time, callback) {

	utils.fx.fadeTo(element, time, 0, callback);
	
}

goog.exportSymbol('utils.fx.fadeOut', utils.fx.fadeOut);