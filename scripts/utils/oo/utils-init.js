//******************************************************
//  
//******************************************************

goog.provide('utils.init');
goog.require('utils.gui.GenericSlider')
utils.init = function () {
	var s = new utils.gui.GenericSlider();
	s.addSlideCallback(function(){
		console.log("hera")
	})
}

//goog.exportSymbol('utils.init', utils.init);

var a = new utils.init();
