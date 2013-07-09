//******************************************************
//  REturns total width of object including borders
//
//******************************************************
goog.provide('utils.css.processCSSObject');

utils.css.processCSSObject = function (obj) {
	
	var pxConvertArr = [
		'height', 
		'width', 
		'left', 
		'top', 
		'borderWidth',
		'borderWidth', 
		'borderRadius',  
		'border-radius',
		'fontSize',
		'fontSize',
		'margin',
		'margin-top',
		'marginTop',
		'marginLeft',
		'margin-left'
	];

	for (key in obj) {
		
		var keyExists = pxConvertArr.indexOf(key) > -1;
			
		if (keyExists && typeof obj[key] === 'number') {
			
			obj[key] = utils.convert.px(obj[key]);
			
		}
	}	
	
	return obj
}

goog.exportSymbol('utils.css.processCSSObject', utils.css.processCSSObject);