//******************************************************
//  REturns total width of object including borders
//
//******************************************************
utils.css.processCSSObject = function (obj) {
	
	var pxConvertArr = [
		'height', 
		'width', 
		'left', 
		'top', 
		'borderWidth',
		'border-width', 
		'borderRadius',  
		'border-radius',
		'fontSize',
		'font-size',
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