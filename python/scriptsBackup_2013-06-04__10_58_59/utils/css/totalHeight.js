//******************************************************
//  REturns total height of object including borders
//
//******************************************************
utils.css.totalHeight = function (elt) {
	var _h = utils.convert.int(elt.style.height);
	if (elt.style.borderWidth) _h += utils.convert.int(elt.style.borderWidth)*2;
	return _h;
}