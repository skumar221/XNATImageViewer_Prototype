xmiv.prototype.deleteDropZone = function(dz){
	
	//----------------------------------
	//	DELETE DROPZONES
	//----------------------------------			
	for (var i=0; i < this.scrollGallery.thumbs.length; i++){
		this.scrollGallery.thumbs[i].deleteDropZone(dz);	
	}
}