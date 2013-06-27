


//******************************************************
//  
//******************************************************
utils.fx.fadeOut = function (element, time, callback) {

	utils.fx.fadeTo(element, time, 0, callback);
	
}