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


function linearContrast(data, value){
	var threshold = .15;
	
	for(var i = 0, n = data.length; i < n; i += 4) {
	
		var red = data[i];
		var green = data[i + 1];
		var blue = data[i + 2];
		var alpha = data[i + 3];

		var Red = red / 255;
		var Green = green / 255;
		var Blue = blue / 255;
		
		Red =   (((Red - threshold) * value/1.2) + threshold) * 255;
		Green = (((Green - threshold) * value/1.2) + threshold) * 255;
		Blue =  (((Blue - threshold) * value/1.2) + threshold) * 255;
		
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