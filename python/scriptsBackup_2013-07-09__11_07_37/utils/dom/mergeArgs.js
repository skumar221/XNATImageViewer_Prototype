//******************************************************
//  Merges two javaScript objects, giving obj2 the priority
//******************************************************
goog.provide('utils.dom.mergeArgs');


utils.dom.mergeArgs = function (obj1, obj2, recursionDepth) {
	var recDepth = (recursionDepth) ? recursionDepth : 2; 
	// obj2 gets the priority
    var obj3 = {};
    for (var attr in obj1) { 
    	obj3[attr] = obj1[attr]; 
    }
    if (obj2) {
	     for (var attr in obj2) { 
	    	//utils.dom.debug(obj2[attr] + " " + obj2[attr].toString())
	    	if (obj2[attr] && (obj2[attr].toString() === '[object Object]') && (attr in obj3)) {
	    		//utils.dom.debug("Found an existing object within an object when merging: " + attr + " " + obj2[attr])
	    		obj3[attr] = utils.dom.mergeArgs(obj3[attr], obj2[attr]);
	    	}
	    	else{
		    	obj3[attr] = obj2[attr];     		
	    	}
	    }   	
    }


    return obj3;
}

goog.exportSymbol('utils.dom.mergeArgs', utils.dom.mergeArgs);
