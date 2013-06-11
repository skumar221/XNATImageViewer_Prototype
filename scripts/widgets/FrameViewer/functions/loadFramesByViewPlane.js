//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the ScanThumbnails.
//******************************************************

FrameViewer.prototype.loadFramesByViewPlane = function (viewPlane) {


	this.currViewPlane = viewPlane.toLowerCase();
	this.ScanViewer.ViewPlaneMenu.activateIcon(this.currViewPlane, true);

	
	switch (this.currViewPlane) {
		case 'sagittal':
			this.loadFrames(this.currDroppable.sagittalFrames_preloaded);
			break;
		case 'coronal':
			this.loadFrames(this.currDroppable.coronalFrames_preloaded);
			break;
		case 'transverse':
			this.loadFrames(this.currDroppable.transverseFrames_preloaded);
			break;
	}	
}