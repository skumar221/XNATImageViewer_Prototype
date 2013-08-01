//******************************************************
//  
//******************************************************
goog.provide('utils.fx.fadeOutAndRemove');
goog.require('utils.fx');
utils.fx.fadeOutAndRemove = function (element, time, callback) {

	utils.fx.fadeTo(element, time, 0, function() { 
		element.parentNode.removeChild(element);
		callback();
	});
	
}
goog.exportSymbol('utils.fx.fadeOutAndRemove' , utils.fx.fadeOutAndRemove);