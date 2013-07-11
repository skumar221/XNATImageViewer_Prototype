goog.require('goog.fx')
goog.require('utils.css.setCSS');
goog.require('XVGlobals');

goog.provide('xmiv');
//xmiv = {};
//goog.exportSymbol('xmiv', xmiv);

goog.provide('xmiv.start');
xmiv.start = function () {

	
	// Prevents Webkit-based browsers
	// from responding to page scrolling, two finger gestures
	// on Mac trackpads

	document.body.style.overflow = 'hidden';

	XVGlobals.ModalID = "thuravingal";
	/**
	 * @const
	 * @type {SliderLinker}
	 */
	XVGlobals.SliderLinker = new SliderLinker();
	
	XV = new Modal({
		parent : document.body
	});	
	
		
}

goog.exportSymbol('xmiv.start', xmiv.start);

