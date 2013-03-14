function mergeArgs(obj1,obj2, recursionDepth){
	var recDepth = (recursionDepth) ? recursionDepth : 2; 
	// obj2 gets the priority
    var obj3 = {};
    for (var attr in obj1) { 
    	obj3[attr] = obj1[attr]; 
    }
    for (var attr in obj2) { 
    	//console.log(obj2[attr] + " " + obj2[attr].toString())
    	if (obj2[attr] && (obj2[attr].toString() === '[object Object]') && (attr in obj3)){
    		//console.log("Found an existing object within an object when merging: " + attr + " " + obj2[attr])
    		obj3[attr] = mergeArgs(obj3[attr], obj2[attr]);
    	}
    	else{
	    	obj3[attr] = obj2[attr];     		
    	}
    }
    return obj3;
}

function _px(args){
	if (args instanceof Array){
		return args.map(function(a) {return a.toString() + 'px'});
	}
	else{
		switch (typeof args){
			case 'number':
				return args.toString() + "px";
		}
	}
}

function _css(className, args){
	if (typeof args === 'object'){
		var s = (className[0] == ".") ? className : "."  + className;
		s += "{"; 
		for (var prop in args) {
	   		s+= " " + prop + ":" + " " + args[prop] + ";"
	    }
	    return s+= "}";
	}
	else{
		throw("Must pass objects to createCssClass!");
	}
}

//from: http://www.webdeveloper.com/forum/showthread.php?130717-How-to-create-CSS-styles-from-within-javascript
function newStyle(str){
	var pa= document.getElementsByTagName('head')[0] ;
	var el= document.createElement('style');
	el.type= 'text/css';
	el.media= 'screen';
	if(el.styleSheet) el.styleSheet.cssText= str;// IE method
	else el.appendChild(document.createTextNode(str));// others
	pa.appendChild(el);
	return el;
}

function _i(val){
	return parseInt(val, 10);
}
