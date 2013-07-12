/*********************************************************************************************
 * 
 *   Contains methods for image manipulation (i.e. brightness and contrast)
 * 
 ********************************************************************************************/
goog.provide("imageProcessing")
imageProcessing = function() {
	
}
goog.exportSymbol('imageProcessing', imageProcessing)


/************************
 * LINEAR BRIGHTNESS
 ***********************/

/**
 * @expose
 */
imageProcessing.prototype.linearBrightness = function(data, value) {
	for(var i = 0, n = data.length; i < n; i += 4) {		
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];
		var alpha = data[i + 3];

		data[i]   = red + value;
		data[i+1] = green + value;
		data[i+2] = blue + value;
	}	
	return data;
}



/************************
 * LINEAR CONTRAST
 ***********************/
/**
 * @expose
 */
imageProcessing.prototype.linearContrast = function(data, value, threshold) {
	//var threshold = .05;
	for(var i = 0, n = data.length; i < n; i += 4) {
	
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];
		var alpha = data[i + 3];

		var Red = red / 255;
		var Green = green / 255;
		var Blue = blue / 255;
		
		Red =   (((Red - threshold) * value/1) + threshold) * 255;
		Green = (((Green - threshold) * value/1) + threshold) * 255;
		Blue =  (((Blue - threshold) * value/1) + threshold) * 255;
		
		var iR = Red;
		iR = (iR > 255) ? 255 : iR;
		iR = (iR < 0) ? 0 : iR;
		
		var iG = Green;
		iG = (iG > 255) ? 255 : iG;
		iG = (iG < 0) ? 0 : iG;
		
		var iB = Blue;
		iB = (iB > 255) ? 255 : iB;
		iB = (iB < 0) ? 0 : iB;

		
		data[i] = Math.round(iR);
		data[i+1] = Math.round(iG);
		data[i+2] = Math.round(iB);
	}
	return data
}



/************************
 * See of an array of objects has a value match
 * for a given key
 ***********************/
/**
 * @expose
 */
imageProcessing.prototype.objArrContains = function(objArr, key, value) {
	var match = -1;
	for (i in objArr) {	 
		////console.log("oaC2")    
		if (objArr[i][key] === value) {
			match = i;	
		}
	 	////console.log("oaC")   
	}
	return match;
}



/************************
 * Histogram for contrast algorithm
 ***********************/
imageProcessing.prototype.histogram = function(data) {
	//console.log("as1, ", data.length)
	var histArr = [];
	for (var i = 0, len = data.length; i < len; i += 4) {		
		
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];	
		////console.log("asA")
		// Average all three colors
		var currIntensity = Math.round((red + green + blue)/3);
		
		
		if (histArr.length > 0) {
			////console.log("asB")
			var inArr = this.objArrContains(histArr, "intensity", currIntensity);
			// if found, up the value count
			////console.log("asC")
			if (inArr !== -1) {
				////console.log("as3")
				histArr[inArr]["count"] +=1; 
				continue;
				////console.log("as8-")
			}
		}
		////console.log("asD")
		// Add object to array if not found
		histArr.push({
			'count': 1, 
			'intensity': currIntensity
		});
		////console.log("asE")
	}	
	//console.log("as2")
	// sort the array of objects by value in ascending order
	histArr = histArr.sort(function (a, b) {
	    return ((a.intensity < b.intensity) ? -1 : ((a.intensity === b.intensity) ? 0 : 1));
	});
	//console.log("as3")
	var countArr = [];
	var intensityArr = [];
	for (var i = 0, len = histArr.length; i < len; i++) {		countArr.push(histArr[i].count);
		intensityArr.push(histArr[i].intensity);
	}
	//console.log("as4")
	return { 
		'objArr': histArr, 
		'countArr': countArr, 
		'intensityArr': intensityArr
	};
}



/************************
 * Math manipulation
 ***********************/
/**
 * @expose
 */
imageProcessing.prototype.sigmaMult = function(arr1, arr2) {
	if ((arr1.length !== arr2.length) || (arr1.length === 0) || (arr2.length ==0)) {
		throw "sigmaMult: Array lengths unequal or zero length!"
	}
	var sigma =0;
	for (var i = 0, len = arr1.length; i < len; i++) {		sigma += (arr1[i]* arr2[i])
	}
	return sigma;
}

function sigma(arr1) {
	if (arr1.length === 0) {
		throw "sigmaMult: Array lengths unequal or zero length!"
	}
	var sigma = 0;
	for (var i = 0, len = arr1.length; i < len; i++) {		sigma += (arr1[i]);
	}
	return sigma;
}

/*
Thresholding algorithm based on 
T. W. Ridler, S. Calward. Picture Thresholding Using an Iterative
Selection Method. IEEE Trans on Systems, Man and Cybernetics, 8:1978

Modified by Mikhail Milchenko, Ph.D.
Staff Scientist
Washinton University Neuroinformatics Research Group

Converted to javaScript by Sunil Kumar
Programmer II
Washinton University Neuroinformatics Research Group
*/
/**
 * @expose
 */
imageProcessing.prototype.thresholdAutoDetect = function(data) {
	//console.log("his1")
	var hist = this.histogram(data);
	var count = hist['countArr'];
	var intensity = hist['intensityArr'];	
//	utils.dom.debug(hist)
	//console.log("his2")
	if (count.length > 1 && intensity.length > 1) {
		//utils.dom.debug("count: " + count);
		//utils.dom.debug("intensity: " + intensity)		
		var numIters = 14;
		var T = [numIters];
		T[0] = Math.round(sigmaMult(count, intensity)/sigma(count));	
		var delta = 1;
		var i = 0;	
		//console.log("his3")
		while ((delta !== 0) && (i<numIters)) {		
			var TInds = [];
			for (var k = 0, len = intensity.length; k < len; k++) {				
				if (intensity[k] > T[i]) {
					TInds.push(k);	
				}
			}
			////console.log("his4")
			var Ti = TInds[0];			
			var mbt = sigmaMult(count.slice(0, Ti) , intensity.slice(0, Ti)) / sigma(count.slice(0, Ti));
			var mat = sigmaMult(count.slice(Ti, count.length-1) , intensity.slice(Ti, count.length-1)) / sigma(count.slice(Ti, count.length-1));
			i+=1;
			////console.log("his5")
			T[i] = Math.round(Math.sqrt(mbt*mat));
			delta = T[i] - T[i-1];
			////console.log("his6")
		}
		//console.log("his4")
		return T[i]/255;	
	}
}