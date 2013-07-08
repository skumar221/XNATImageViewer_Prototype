//******************************************************
//  Determines if there's an argument match between template and args
//  with template being the priority
//******************************************************
goog.provide('utils.dom.debug');
utils.dom.debug = function (msg) {
	window.console && console.log(msg);
}

goog.exportSymbol('utils.dom.debug', utils.dom.debug);
