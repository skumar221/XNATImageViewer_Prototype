//******************************************************
//  
//******************************************************
goog.provide('utils.fx.fadeTo');

goog.require('goog.fx.dom')

utils.fx.fadeTo = function (element, time, opacity, callback) {
	
	//$(element).fadeTo(time, opacity, callback);
	var prevOp = element.style.opacity ? parseInt(element.style.opacity, 10) : 1;
	var f = new goog.fx.dom.Fade(element, prevOp, opacity, time);
	if (callback) {
		f.addEventListener(goog.fx.Transition.EventType.END, function(e){ 
			callback(e);
		})		
	}
	f.play();
}

goog.exportSymbol('utils.fx.fadeTo' , utils.fx.fadeTo);