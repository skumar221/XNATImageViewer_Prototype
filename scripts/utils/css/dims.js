//******************************************************
//  
//******************************************************
goog.provide('utils.css.dims');
goog.require('goog.style')


utils.css.dims = function (elt, arg1) {
	
	if (arg1 && typeof arg1 === 'string') {
		//
		// Basically, if we're looking for just attribute we go right to the kill...
		//
		var val;
		
		switch(arg1) {
			case 'height':
				return elt.clientHeight;// || $(elt).height();
			case 'width':
				return elt.clientWidth;// || $(elt).width();
			case 'outerHeight':
				return elt.offsetHeight;
			case 'outerWidth':
				return elt.offsetWidth;
			case 'offsetTop':
				return elt.offsetTop;
			case 'offsetLeft':
				return elt.offsetLeft
			default:

				val = /%emt/.test(elt.style[arg1]);
				
				if (!val) {
					return utils.convert.toInt(elt.style[arg1]);
				}
				
				var p = goog.style.getRelativePosition(elt, elt.parentNode);
				var posObj = {
					left: utils.convert.toInt(elt.style.left) || p.x,
					top: utils.convert.toInt(elt.style.top) || p.y
				};

				return posObj[arg1];
				//return utils.convert.toInt(elt.style[arg1]) //||  $(elt).position()[arg1];
				//return $(elt).position()[arg1];
		}
		
	} else {


		var retObj = {};

		var p = goog.style.getRelativePosition(elt, elt.parentNode);
		var posObj = {
			left: utils.convert.toInt(elt.style.left) || p.x,
			top: utils.convert.toInt(elt.style.top) || p.y
		};

		retObj = utils.dom.mergeArgs(retObj, posObj);		
		retObj['left'] = posObj.left;
		retObj['top'] = posObj.top;
		retObj['height'] = elt.clientHeight;
		retObj['width'] = elt.clientWidth;			
		retObj['outerHeight'] = elt.offsetWidth;
		retObj['outerWidth'] = elt.offsetHeight;
		retObj['offsetTop'] = elt.offsetTop;
		retObj['offsetLeft'] = elt.offsetLeft;	

		return retObj;
	
	}
}

goog.exportSymbol('utils.css.dims', utils.css.dims);
