//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the ScanThumbnails.
//******************************************************

FrameViewer.prototype.loadFramesByViewPlane = function (viewPlane) {

	this.currViewPlane = viewPlane.toLowerCase();
	this.ScanViewer.ViewPlaneMenu.activateIcon(this.currViewPlane, true);
	
	var frames = this.currDroppable.getFrames({
		'viewPlane' : this.currViewPlane,
		'filter' : 'img'
	});
				
	this.loadFrames(frames);
	
}