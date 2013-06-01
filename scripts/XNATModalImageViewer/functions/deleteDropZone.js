XNATModalImageViewer.prototype.deleteDropZone = function (dz) {
	
	//----------------------------------
	//	DELETE DROPZONES
	//----------------------------------			
	for (var i=0; i < this.ScrollGallery.thumbs.length; i++) {
		this.ScrollGallery.thumbs[i].deleteDropZone(dz);	
	}
}