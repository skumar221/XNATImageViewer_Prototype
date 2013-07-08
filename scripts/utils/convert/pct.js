goog.provide('utils.convert.pct')

utils.convert.pct = function (value) {
	return (value * 100).toString() + "%";
}

goog.exportSymbol('utils.convert.pct', utils.convert.pct);	 