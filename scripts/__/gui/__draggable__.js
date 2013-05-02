






//******************************************************
//  The general idea here is that there's an overlaying
//  div on top of the slider that, when clicked
//  expands to 100% of the page size.
//******************************************************
function __draggable__(obj, moveBounds, listenBounds){
	if (!moveBounds.height || !moveBounds.width ||
		!moveBounds.top || !moveBounds.left){
			throw "__draggable__ : More moveBounds parameters needed!"
	}
		
	if (!listenBounds.height || !listenBounds.width ||
		!listenBounds.top || !listenBounds.left){
			throw "__draggable__ : More moveBounds parameters needed!"
	}
}