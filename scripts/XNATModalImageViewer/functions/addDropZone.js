XNATModalImageViewer.prototype.addDropZone = function (dz) {
	
	//----------------------------------
	//	SET DROPZONES
	//----------------------------------			
	for (var i=0; i < this.ScrollGallery.thumbs.length; i++) {
		this.ScrollGallery.thumbs[i].addDropZone(dz);	
	}
}