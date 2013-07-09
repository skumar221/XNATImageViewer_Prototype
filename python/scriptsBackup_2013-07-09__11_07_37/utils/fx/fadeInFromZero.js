

//******************************************************
//  
//******************************************************
goog.provide('utils.fx.fadeInFromZero');

utils.fx.fadeInFromZero = function (element, time, callback) {

	utils.fx.fadeTo(element, 0, 0, function() {
		
		utils.fx.fadeTo(element, time, 1, callback);
		
	});
	
}
goog.exportSymbol('utils.fx.fadeInFromZero', utils.fx.fadeInFromZero);