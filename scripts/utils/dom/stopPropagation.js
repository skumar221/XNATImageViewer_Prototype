goog.provide('utils.dom.stopPropagation')

utils.dom.stopPropagation = function (e) {
	if (!e) var e = window.event;
		e.cancelBubble = true;
	if (e.stopPropagation) 
		e.stopPropagation();
}

goog.exportSymbol('utils.dom.stopPropagation', utils.dom.stopPropagation)
