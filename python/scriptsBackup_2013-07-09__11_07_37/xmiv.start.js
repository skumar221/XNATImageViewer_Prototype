goog.require('goog.fx')
goog.require('utils.css.setCSS');

goog.provide('xmiv');
xmiv = {};

goog.provide('xmiv.start');
xmiv.start = function () {

	
	// Prevents Webkit-based browsers
	// from responding to page scrolling, two finger gestures
	// on Mac trackpads

	document.body.style.overflow = 'hidden';

	GLOBALS.ModalID = "thuravingal";
	
	var _ooo = new Modal({
		parent : document.body
	});	
	
		
}

goog.exportSymbol('xmiv.start', xmiv.start);