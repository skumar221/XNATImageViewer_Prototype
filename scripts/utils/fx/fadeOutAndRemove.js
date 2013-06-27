//******************************************************
//  
//******************************************************
utils.fx.fadeOutAndRemove = function (element, time, callback) {

	utils.fx.fadeTo(element, time, 0, function() { 
		element.parentNode.removeChild(element);
		callback();
	});
	
}