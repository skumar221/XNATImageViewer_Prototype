function __collisionArea__(a,b, flip) {

    
	var aPos = $(a).offset();    	
	var bPos = $(b).offset();
	
	aPos.right = aPos.left + $(a).width();
	aPos.bottom = aPos.top + $(a).height();

	bPos.right = bPos.left + $(b).width();
	bPos.bottom = bPos.top + $(b).height();
	
	
	//
	//  lettered according to top right corner
	//  of rectangle, clockwise
	//
	var i = (aPos.right > bPos.left && aPos.right < bPos.right);
	var j = (aPos.left > bPos.left && aPos.left < bPos.right);
	var k = (aPos.top < bPos.top)
	var l = (aPos.bottom < bPos.bottom)


	if (rLess && tLess){
		
	}
}