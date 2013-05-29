//******************************************************
//  Determines if there's an argument match between template and args
//  with template being the priority
//******************************************************
function __validateArgs__(originString, templateArgs, args, callback) {
	
	var errorStr = "A " + originString + " has invalid arguments:";
	
    for (var attr in args) { 
    	if (! (attr in templateArgs)) {
    		throw (errorStr + " '" + attr + "' "); 
    	}
    	else{
    		
    		// Recurse if the value is an object
   			if (args[attr].toString() === '[object Object]') {
   				__validateArgs__(originString, templateArgs[attr], args[attr])
   			} 		
    	}
    }

	if (callback) { callback() };
}