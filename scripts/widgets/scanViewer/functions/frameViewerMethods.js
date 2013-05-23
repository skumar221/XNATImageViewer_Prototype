//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the scanThumbnails.
//******************************************************

frameViewer.prototype.loadFramesByAxis = function(frameType, axisIcons){
	
	if (frameType.toLowerCase() == "sagittal")
		this.loadFrames(this.currDroppable.sagittalFrames);
	if (frameType.toLowerCase() == "transverse" || frameType.toLowerCase() == "axial")
		this.loadFrames(this.currDroppable.axialFrames);
	if (frameType.toLowerCase() == "coronal")
		this.loadFrames(this.currDroppable.coronalFrames);
	
//	console.log(axisIcons[0].axis);
	if(axisIcons){
		for (var i=0; i<axisIcons.length; i++){
			console.log(axisIcons[0].axis, axisIcons[i].axis.toLowerCase(), frameType.toLowerCase());
			if (axisIcons[i].axis.toLowerCase() == frameType.toLowerCase()){
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


frameViewer.prototype.loadDroppable = function(droppable){
	if (droppable.sagittalFrames){
		this.currDroppable = droppable;
		this.loadFramesByAxis("sagittal");
	}
	else{
		throw "FrameViewer.js: Invalid Droppable for frameViewer."
	}

}