//******************************************************
// 
//******************************************************
goog.provide('utils.dom.addClass');

utils.dom.addClass = function (element, className) {
	var spacer = (element.className.length > 0) ? " " : "";
	element.className += spacer + className;
}

goog.exportSymbol('utils.dom.addClass', utils.dom.addClass);
