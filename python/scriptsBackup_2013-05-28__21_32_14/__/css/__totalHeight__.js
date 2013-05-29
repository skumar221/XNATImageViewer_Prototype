//******************************************************
//  REturns total height of object including borders
//
//******************************************************
function __totalHeight__(elt) {
	var _h = __toInt__(elt.style.height);
	if (elt.style.borderWidth) _h += __toInt__(elt.style.borderWidth)*2;
	return _h;
}