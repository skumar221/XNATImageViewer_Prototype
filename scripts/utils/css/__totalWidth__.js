//******************************************************
//  REturns total width of object including borders
//
//******************************************************
function __totalWidth__(elt) {
	var _h = __toInt__(elt.style.width);
	if (elt.style.borderWidth) _h += __toInt__(elt.style.borderWidth)*2;
	return _h;
}