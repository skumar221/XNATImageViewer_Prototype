function mergeArgs(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
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
