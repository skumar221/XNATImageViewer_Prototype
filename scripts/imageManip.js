function linearBrightness(data, value){
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


function linearContrast(data, value, threshold){
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

function objArrContains(objArr, key, value){
	var match = -1;
	for (var i = 0; i < objArr.length; i++) {
	   if (objArr[i][key] == value) 
	        match = i;
	}
	return match;
}

function histogram(data){
	var histArr = [];
	for(var i = 0; i < data.length; i += 4) {	
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];	
		// Average all three colors
		var currIntensity = Math.round((red + green + blue)/3);
		if (histArr.length > 0){
			var inArr = objArrContains(histArr, "intensity", currIntensity);
			// if found, up the value count
			if (inArr != -1){
				histArr[inArr]["count"] +=1; 
				continue;
			}
		}
		// Add object to array if not found
		histArr.push({count: 1, intensity: currIntensity});
	}	
	// sort the array of objects by value in ascending order
	histArr = histArr.sort(function(a, b) {
	    return ((a.intensity < b.intensity) ? -1 : ((a.intensity == b.intensity) ? 0 : 1));
	});
	
	var countArr = [];
	var intensityArr = [];
	for (var i=0; i<histArr.length;i++){
		countArr.push(histArr[i].count);
		intensityArr.push(histArr[i].intensity);
	}
	return {objArr: histArr, 'countArr': countArr, 'intensityArr': intensityArr};
}


function sigmaMult(arr1, arr2){
	if ((arr1.length != arr2.length) || (arr1.length == 0) || (arr2.length ==0)) {
		throw "sigmaMult: Array lengths unequal or zero length!"
	}
	var sigma =0;
	for (var i=0;i<arr1.length;i++){
		sigma += (arr1[i]* arr2[i])
	}
	return sigma;
}

function sigma(arr1){
	if (arr1.length == 0) {
		throw "sigmaMult: Array lengths unequal or zero length!"
	}
	var sigma = 0;
	for (var i=0;i<arr1.length;i++){
		sigma += (arr1[i]);
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

function thresholdAutoDetect(data){
	var hist = histogram(data);
	var count = hist.countArr;
	var intensity = hist.intensityArr;	
//	console.log(hist)
	if (count.length > 1 && intensity.length > 1){
		//console.log("count: " + count);
		//console.log("intensity: " + intensity)		
		var numIters = 14;
		var T = [numIters];
		T[0] = Math.round(sigmaMult(count, intensity)/sigma(count));	
		var delta = 1;
		var i = 0;	
		while ((delta != 0) && (i<numIters)){		
			var TInds = [];
			for (var k=0;k<intensity.length;k++){
				if (intensity[k] > T[i]){
					TInds.push(k);	
				}
			}
			var Ti = TInds[0];			
			var mbt = sigmaMult(count.slice(0, Ti) , intensity.slice(0, Ti)) / sigma(count.slice(0, Ti));
			var mat = sigmaMult(count.slice(Ti, count.length-1) , intensity.slice(Ti, count.length-1)) / sigma(count.slice(Ti, count.length-1));
			i+=1;
			T[i] = Math.round(Math.sqrt(mbt*mat));
			delta = T[i] - T[i-1];
		}
		return T[i]/255;	
	}
}