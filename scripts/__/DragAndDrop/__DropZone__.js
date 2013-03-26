
function elementCollision(a,b, flip){

    var al = $(a).offset().left;
    var ar = al + $(a).outerWidth();
    var at = $(a).offset().top;
    var ab = at + $(a).outerHeight();

    var bl = $(b).offset().left;
    var br = bl + $(b).outerWidth();
    var bt = $(b).offset().top;
    var bb = bt + $(b).outerHeight();

	
    if(bl>ar || br<al){return false;}//overlap not possible
    if(bt>ab || bb<at){return false;}//overlap not possible

    if(bl>al && bl<ar){return true;}
    if(br>al && br<ar){return true;}

    if(bt>at && bt<ab){return true;}
    if(bb>at && bb<ab){return true;}

    if (flip === false) return false;
    else return (elementCollision(b, a, false))
}

//*********************************************
// GET DROP ZONE, returns a number, -1 if none
//*********************************************
function checkIfOverDropZone(elt, dropZones){
	if (dropZones && dropZones.length > 0){
		
		var element = __ExtractElement__(elt);
		for (var i=0; i<dropZones.length; i++){
			//------------------------------------
			// Check and see if dropZone[i] is an element
			//------------------------------------		
			var dzElt = __ExtractElement__(dropZones[i]);
			
			
			//------------------------------------
			// If a collision is detected, return the zone number
			//------------------------------------	
			if (dzElt && elementCollision(element, dzElt, true)){
				return i;
			}			
		}
	}
	
	return -1;
}

