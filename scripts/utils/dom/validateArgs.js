//******************************************************
//  Determines if there's an argument match between template and args
//  with template being the priority
//******************************************************
goog.provide('utils.dom.validateArgs');
utils.dom.validateArgs = function (originString, templateArgs, args, callback) {
	
	var errorStr = "A " + originString + " has invalid arguments:";
	
    for (var attr in args) { 
    	if (! (attr in templateArgs)) {
    		throw (errorStr + " '" + attr + "' "); 
    	}
    	else{
    		
    		// Recurse if the value is an object
   			if (args[attr].toString() === '[object Object]') {
   				utils.dom.validateArgs(originString, templateArgs[attr], args[attr])
   			} 		
    	}
    }

	if (callback) { callback() };
}

goog.exportSymbol('utils.dom.validateArgs', utils.dom.validateArgs)
