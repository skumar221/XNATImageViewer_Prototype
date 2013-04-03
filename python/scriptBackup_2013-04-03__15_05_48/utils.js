var _MOUSEX = 0;
var _MOUSEY = 0;

$(document).mousemove(function(e){
	_MOUSEX = e.pageX;
	_MOUSEY = e.pageY;
});





function CSS(className, args){
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


