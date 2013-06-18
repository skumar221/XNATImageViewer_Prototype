goog.require('goog.ui.Component');
goog.require('goog.dom');

XNATViewerOnload = function () {


	// Prevents Webkit-based browsers
	// from responding to page scrolling, two finger gestures
	// on Mac trackpads
	$("body").css({
		'overflow' : 'hidden'
	})
	

	var _ooo = new XNATViewer({
		parent : document.body
	});	
	
	
}