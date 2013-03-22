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