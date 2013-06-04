function __extractElementFromObject__(o) {	

	//------------------------------------
	// Check to see if the object itself is an element
	//------------------------------------							
	if (__isElement__(o)) {return o;}
	
	
	//------------------------------------
	// Check to see if its properties contain an element
	//------------------------------------				
	else{
		var eltKeys = ["elt", "widget", "element", "div"];
		for (var i=0;i<eltKeys.length;i++) {
			if (__isElement__(o[eltKeys[i]])) {return o[eltKeys[i]];}			
		}  
	}	
	
	return null;
}
