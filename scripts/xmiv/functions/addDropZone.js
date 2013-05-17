xmiv.prototype.addDropZone = function(dz){
	
	//----------------------------------
	//	SET DROPZONES
	//----------------------------------			
	for (var i=0; i < this.scrollGallery.thumbs.length; i++){
		this.scrollGallery.thumbs[i].addDropZone(dz);	
	}
}