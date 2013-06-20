XNATViewer.prototype.addScrollGallery = function (rowPos) {	
	
	var that = this;
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.ScrollGallery = new ScrollGallery({
		parent: this.modal,
		orientation: "vertical",
		widgetCSS: {
			left: 0,
			top: this.args.marginTop,
			height: 700
		}
	});	
	

	this.ScrollGallery.addZippy('Scans');
	
	var thumbContents = this.ScrollGallery.getScrollables('Scans' , 'content');
	var thumbContentsWidth = utils.css.dims(thumbContents, 'width');
	
	for (var i = 0, len = that.scanDataPaths.length; i < len; i++) {
		//var h = i * (GLOBALS.ThumbnailWidgetHeight + 2);  	
		var scanThumb = new ScanThumbnail(that.scanDataPaths[i], {
		  	id: "ScanThumbnail_" + i.toString(),			  	
		  	parent: thumbContents,  	
		  	widgetCSS: {
		  		position: "relative",
		  		//top: h, 
		  		left: 0,
		  		width: thumbContentsWidth
		  	}			  	
		});
	}	

	this.ScrollGallery.moveContents(this.ScrollGallery.ContentSlider, this.ScrollGallery);
	//this.ScrollGallery.ContentSlider.setValue(this.ScrollGallery.ContentSlider.getValue() - 1);
}