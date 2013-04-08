

//Returns true if it is a DOM element 
// from: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
function __IsElement__(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
	);
}


function __ExtractElement__(o){	
	//------------------------------------
	// Check to see if the object itself is an element
	//------------------------------------							
	if (__IsElement__(o)) {return o;}
	
	
	//------------------------------------
	// Check to see if its properties contain an element
	//------------------------------------				
	else{
		var eltKeys = ["elt", "widget", "element", "div"];
		for (var i=0;i<eltKeys.length;i++){
			if (__IsElement__(o[eltKeys[i]])) {return o[eltKeys[i]];}			
		}  
	}	
	
	return null;
}

function __CloneCanvas__(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
}



function __ToInt__(val){
	return parseInt(val, 10);
}




function __Pct__(value){
	return (value * 100).toString() + "%";
}



function __ApplyHoverAnim__(elt, beforeCSS, afterCSS, animtime, beforeCallback, afterCallback){
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





function __SwapArrayElements__(darr){
	var holder = darr[0];
	darr[0] = darr[1];
	darr[1] = holder;
	return darr;
}



function __Remap1D__(n, dold, dnew){


	//console.log("N: " + n)
	//console.log("dold: " + dold)
	//console.log("dnew: " + dnew)
	
	if ((dold[0] == dold[1]) || (dnew[0] == dnew[1])){
		throw ("Remap: initial domain is equal!");
	}
	
	if (dold[0] > dold[1]){
		dold = __SwapArrayElements__(dold);
	}

	if (dnew[0] > dnew[1]){
		dnew = __SwapArrayElements__(dnew);
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

