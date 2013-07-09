//******************************************************
//  
//******************************************************
goog.provide('utils.fx.fadeTo');

utils.fx.fadeTo = function (element, time, opacity, callback) {
	
	$(element).fadeTo(time, opacity, callback);
	
}

goog.exportSymbol('utils.fx.fadeTo' , utils.fx.fadeTo);