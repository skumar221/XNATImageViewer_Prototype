//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the Thumbnails.
//******************************************************

FrameViewer.prototype.loadFramesByViewPlane = function (viewPlane) {

	this.currViewPlane = viewPlane.toLowerCase();
	this.ViewerBox.ViewPlaneMenu.activateIcon(this.currViewPlane, true);
	
	var frames = this.currDroppable.getFrames({
		'viewPlane' : this.currViewPlane,
		'filter' : 'img'
	});
				
	this.loadFrames(frames);
	
}