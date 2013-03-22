var _MOUSEX = 0;
var _MOUSEY = 0;

$(document).mousemove(function(e){
	_MOUSEX = e.pageX;
	_MOUSEY = e.pageY;
});

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



function _i(val){
	return parseInt(val, 10);
}

function swap(darr){
	var holder = darr[0];
	darr[0] = darr[1];
	darr[1] = holder;
	return darr;
}

function _remap1D(n, dold, dnew){


	//console.log("N: " + n)
	//console.log("dold: " + dold)
	//console.log("dnew: " + dnew)
	
	if ((dold[0] == dold[1]) || (dnew[0] == dnew[1])){
		throw ("Remap: initial domain is equal!");
	}
	
	if (dold[0] > dold[1]){
		dold = swap(dold);
	}

	if (dnew[0] > dnew[1]){
		dnew = swap(dnew);
	}

	if (n <= dold[0]){
		n = dold[0];
		var returner = {
			newVal: dnew[0],
			adjOld: n
		};
		return returner;
	}
	else if (n >= dold[1]){
		n = dold[1];
		var returner = {
			newVal: dnew[1],
			adjOld: n
		};
		return returner;
	}
	
    var newVal = Math.round((n/(dold[1]-dold[0])) * ((dnew[1]-dnew[0])));

    if (newVal < dnew[0]){
		newVal = dnew[0];
	}
	else if (newVal > dnew[1]){
		newVal = dnew[1];
	}
    
    //console.log("newVAl: " + newVal);    
    //console.log("*****************")
	return {
		newVal: newVal,
		adjOld: n
	};
}


function _pct(value){
	return (value * 100).toString() + "%";
}

function applyHoverAnim(elt, beforeCSS, afterCSS, animtime, beforeCallback, afterCallback){
	if (!elt)
		throw("HoverAnim in utils.js: need to apply element")
	
	if (!beforeCSS)
		beforeCSS = {
			"border-color": "rgba(50,50,50,1)",
		}
			
	if (!afterCSS)
		afterCSS = {
			"border-color": "rgba(200,200,200,1)",
		}
		
	if (!animtime)
		animtime = 100;
	if (!beforeCallback)
		beforeCallback = function(){};
	if (!afterCallback)
		afterCallback = function(){};
		
	$(elt).mouseover(function(){
	  $(elt).stop().animate(afterCSS, animtime, beforeCallback);
	}).mouseleave(
		function(){ 
		$(elt).stop().animate(beforeCSS, animtime, afterCallback);	
	});
}

function layerMouseClick(event){
	
 	if (event.offsetX){
 		return {x: event.offsetX, y: event.offsetY};
 	}
 	else if (event.layerX){
 		return {x: event.layerX, y: event.layerY};
 	}
	 		
}


