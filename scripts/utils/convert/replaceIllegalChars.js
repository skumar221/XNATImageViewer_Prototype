goog.provide('utils.convert.replaceIllegalChars')

utils.convert.replaceIllegalChars = function (value, replaceStr) {
	
	if (typeof value !== 'string') {
		throw Error("Illegal value " + typeof value + " in argument of utils.convert.replaceIllegalChars.")
	}
	
	if (!replaceStr) {
		replaceStr = "";
	}
	
	var replaced = value.replace(/\/./g, replaceStr);
	
	return replaced;
	
}

goog.exportSymbol('utils.convert.replaceIllegalChars', utils.convert.replaceIllegalChars);