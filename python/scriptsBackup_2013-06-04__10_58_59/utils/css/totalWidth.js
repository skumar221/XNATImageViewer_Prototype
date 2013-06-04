//******************************************************
//  REturns total width of object including borders
//
//******************************************************
utils.css.totalWidth = function(elt) {
	var _h = utils.convert.int(elt.style.width);
	if (elt.style.borderWidth) _h += utils.convert.int(elt.style.borderWidth)*2;
	return _h;
}