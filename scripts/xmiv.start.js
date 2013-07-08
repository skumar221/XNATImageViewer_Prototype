goog.require('goog.fx')

goog.provide('xmiv');
xmiv = {};

goog.provide('xmiv.start');
xmiv.start = function () {

	
	// Prevents Webkit-based browsers
	// from responding to page scrolling, two finger gestures
	// on Mac trackpads

	utils.css.setCSS( "body", {
		'overflow' : 'hidden'
	})
	
	GLOBALS.ModalID = "thuravingal";
	
	var _ooo = new Modal({
		parent : document.body
	});	
	
		
}

goog.exportSymbol('xmiv.start', xmiv.start);