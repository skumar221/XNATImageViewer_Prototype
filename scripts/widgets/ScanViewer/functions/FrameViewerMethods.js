//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the ScanThumbnails.
//******************************************************

FrameViewer.prototype.loadFramesByAxis = function (frameType, axisIcons) {
	
	if (frameType.toLowerCase() == "sagittal")
		this.loadFrames(this.currDroppable.sagittalFrames);
	if (frameType.toLowerCase() == "transverse" || frameType.toLowerCase() == "axial")
		this.loadFrames(this.currDroppable.axialFrames);
	if (frameType.toLowerCase() == "coronal")
		this.loadFrames(this.currDroppable.coronalFrames);
	
	$(this.canvas).fadeTo(GLOBALS.animFast, 1);
//	console.log(axisIcons[0].axis);
	if(axisIcons) {
		for (var i=0; i<axisIcons.length; i++) {
			console.log(axisIcons[0].axis, axisIcons[i].axis.toLowerCase(), frameType.toLowerCase());
			if (axisIcons[i].axis.toLowerCase() == frameType.toLowerCase()) {
				$(axisIcons[i]).unbind('mouseleave')
				$(axisIcons[i]).fadeTo(0,1);
				
			}
			else{
				console.log("not it")
				$(axisIcons[i]).fadeTo(0, .5);
			}
		}	
	}
}


FrameViewer.prototype.loadDroppable = function (droppable) {
	if (droppable.sagittalFrames) {
		
		this.currDroppable = droppable;
		this.loadFramesByAxis("sagittal");
		
		
		//
		//  Activate the relevant ScanViewer icon
		//
		var k = $(this.args.parent).find('div[id*="axisMenu"]')
		for (var i=0; i<k.length; i++) {
			if (k[i].activateIcon) {
				k[i].activateIcon("sagittal");		
				return;
			}
		}

	}
	else{
		throw "FrameViewer.js: Invalid Droppable for FrameViewer."
	}

}