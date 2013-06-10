//******************************************************
//  Method for handling objects that are "Droppable".
//  In this case, they are the ScanThumbnails.
//******************************************************

FrameViewer.prototype.loadFramesByViewPlane = function (frameType, axisIcons) {

	this.currViewPlane = frameType.toLowerCase();
	
	
	if (this.currViewPlane == "sagittal"){		
		this.loadFrames(this.currDroppable.sagittalFrames);
	}
		
	else if (this.currViewPlane == "transverse" || this.currViewPlane == "axial") {
		this.loadFrames(this.currDroppable.axialFrames);
	}
		
	else if (this.currViewPlane == "coronal") {
		this.loadFrames(this.currDroppable.coronalFrames);
	}
		
	
	var viewPlaneStr = "<b>" + this.currViewPlane.charAt(0).toUpperCase() + this.currViewPlane.slice(1) + " View Plane</b>";

	var loadStr = "<br> Scan " + (this.currDroppable.scanData.sessionInfo["Scan"].value).toString() + " / "
				  + viewPlaneStr + " / "
	              + this.frames.length.toString() + " frames <br>";
	              
	this.progBar.update({
		'label': "Loading...  "  + loadStr
	});
	
	
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

		this.loadFramesByViewPlane("sagittal");
		
		
		//
		//  Activate the relevant ScanViewer icon
		//
		var k = $(this.args.parent).find('div[id*="AxisMenu"]')
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