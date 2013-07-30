goog.require('FrameHolder');
goog.provide('FrameHolder.loadFramesByViewPlane');
//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the Thumbnails.
//******************************************************

FrameHolder.prototype.loadFramesByViewPlane = function (viewPlane) {

	this.currViewPlane = viewPlane.toLowerCase();
	this.Viewer.ViewPlaneMenu.activateIcon(this.currViewPlane, true);
	
	var frames = this.currDroppable.getFrames({
		'viewPlane' : this.currViewPlane,
		'filter' : 'img'
	});
	
		
	this.loadFrames(frames);
	
	
}
goog.exportProperty(FrameHolder.prototype, 'loadFramesByViewPlane', FrameHolder.prototype.loadFramesByViewPlane);
