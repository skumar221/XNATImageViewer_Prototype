






//******************************************************
//  The general idea here is that there's an overlaying
//  div on top of the slider that, when clicked
//  expands to 100% of the page size.
//******************************************************
function __draggable__(element, dragBounds, listenBounds){

	var paramList = ["height", "width", "top", "left"];
	
	element.style.position = "fixed";
	
	
	//-webkit-user-select: none; /* Chrome/Safari */        
    //-moz-user-select: none; /* Firefox */
    //-ms-user-select: none; /* IE10+ */

    /* Not implemented yet */
    //-o-user-select: none;
    //user-select: none;   
	
	

	
	for (i in paramList){
		if (! paramList[i] in dragBounds){
			throw "__draggable__ init: Missing necessary dragBounds parameter: " + paramList[i]
		}

		if (! paramList[i] in dragBounds){
			throw "__draggable__ init: Missing necessary dragBounds parameter: " + paramList[i]
		}
	}



	__mouseListener__(element, {
		mousemove: [
			function(event){
					console.log("MOVING");
					
					var newPt = __getMouseXY__(event);	
		
			
					var elementWidth = __toInt__(element.style.width);
					var elementHeight = __toInt__(element.style.height);
					var elementTop = __toInt__(element.style.top);
					var elementLeft = __toInt__(element.style.left);
						   
					var tempLeft = newPt.x - // mouseclick x
								   element.parentNode.getBoundingClientRect().left - 
								   elementWidth/2; // centers the handle on the mouse pointer		
								   
					var tempTop = newPt.y - // mouseclick x
								   element.parentNode.getBoundingClientRect().top - 
								   elementHeight/2; // centers the handle on the mouse pointer	
								   
					
					var moveWidth = (tempLeft + elementWidth);
					
					console.log(elementTop, dragBounds.top, dragBounds.height);
					
					if (tempLeft < dragBounds.left){
						tempLeft = dragBounds.left
					}
					else if (moveWidth > dragBounds.width){
						tempLeft = dragBounds.width - elementWidth
					}
					
					
					element.style.left = __toPx__(tempLeft);
					element.style.top = __toPx__(tempTop);
					//element.style.top = __toPx__(647);						
			}
		]
	});


    /*
	element.mouseDown = false;
	
	element.onmousedown = function(event){
		element.mouseDown = true;
		//element.style.position = "fixed"
	}
	
	element.onmouseout = function(event){
		console.log("MOUSEOUT")
		//element.mouseDown = false;
		//element.style.position = "fixed"
	}
	
	element.onmousemove = function(event){
		if (element.mouseDown){

			var newPt = __getMouseXY__(event);	
			
			document.body.style["-webkit-user-select"] = "none;"
			document.body.style["-moz-user-select"] = "none;"
			document.body.style["-ms-user-select"] = "none;"
			document.body.style["-o-user-select"] = "none;"
			document.body.style["user-select"] = "none;"
	
	
			var elementWidth = __toInt__(element.style.width);
			var elementHeight = __toInt__(element.style.height);
			var elementTop = __toInt__(element.style.top);
			var elementLeft = __toInt__(element.style.left);
				   
			var tempLeft = newPt.x - // mouseclick x
						   //element.parentNode.getBoundingClientRect().left - 
						   elementWidth/2; // centers the handle on the mouse pointer		
						   
			var tempTop = newPt.y - // mouseclick x
						   //element.parentNode.getBoundingClientRect().top - 
						   elementHeight/2; // centers the handle on the mouse pointer	
						   
			
			var moveWidth = (tempLeft + elementWidth);
			
			console.log(elementTop, dragBounds.top, dragBounds.height);
			
			if (tempLeft < dragBounds.left){
				tempLeft = dragBounds.left
			}
			else if (moveWidth > dragBounds.width){
				tempLeft = dragBounds.width - elementWidth
			}
			
			
			element.style.left = __toPx__(tempLeft);
			element.style.top = __toPx__(tempTop);
			//element.style.top = __toPx__(647);
		}		
	}
	
	element.onmouseup = function(event){
		element.mouseDown = false;
	}
	*/
	
	if (!element.updateDragBounds){
		element.updateDragBounds = function(dragBounds){

			console.log("dragBounds", dragBounds);
			dragBounds.backgroundColor = "rgba(255,0,0,.2)";
			dragBounds.zIndex = 2100000000;
			dragBounds.position = "fixed"
			
			//	Debugging
			if (!element.boundsElt){
				
			}
			//	element.boundsElt = __makeElement__("div", element.parentNode, "BOUNDS ELT", dragBounds);
			//__setCSS__(element.boundsElt, dragBounds);
			
			element.onmousedown = function(){};
			element.onmousemove = function(){};
			element.onmouseup = function(){};
			//__draggable__(element, dragBounds)
		}	
	}	
	
	
}