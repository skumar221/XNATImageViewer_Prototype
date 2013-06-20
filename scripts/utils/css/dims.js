//******************************************************
//  
//******************************************************
goog.require('goog.style');

utils.css.dims = function (elt, arg1, arg2, arg3, arg4) {
	
	var dimArgs = [];
	var retObj = {};
	
	
	if (arguments.length > 1) {
		for (var i=1, len = arguments.length; i < len; i++) {
			dimArgs.push(arguments[i])
		}
	}
	else {
		dimArgs = ['height', 'width', 'position'];
	}

	var size = goog.style.getSize(elt);
	if (dimArgs.indexOf('height') > -1) {
		retObj['height'] = size.height;//$(elt).height();

	}
	
	if (dimArgs.indexOf('width') > -1) {
		retObj['width'] = size.width;//$(elt).width();
	}
	
	
	var includePos = (dimArgs.indexOf('position') > -1) 
					 || (dimArgs.indexOf('pos') > -1) 
					 || (dimArgs.indexOf('left') > -1) 
					 || (dimArgs.indexOf('top') > -1);
	
	if (includePos) {
		
		var p = $(elt).position();
		retObj['left'] = p.left;
		retObj['top'] = p.top;
		retObj['position'] = p;
		retObj['pos'] = p;

	}
	

	if (dimArgs.indexOf('outerHeight') > -1) {
		retObj['outerHeight'] = $(elt).outerHeight();
	}

	if (dimArgs.indexOf('outerWidth') > -1) {
		retObj['outerWidth'] = $(elt).outerWidth();
	}


	
	//
	// If only one argument after element,
	// simply return the number, not the object.
	//
	if (arguments.length == 2) {
		for (var i in retObj) {
			return retObj[i];
		}
	}
	return retObj;
	
}