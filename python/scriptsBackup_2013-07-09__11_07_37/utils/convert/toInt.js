goog.provide('utils.convert.toInt')

utils.convert.toInt = function (val) {
	return parseInt(val, 10);
}

goog.exportSymbol('utils.convert.toInt', utils.convert.toInt)
