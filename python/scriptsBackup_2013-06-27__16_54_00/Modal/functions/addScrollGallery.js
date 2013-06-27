Modal.prototype.addScrollGallery = function (rowPos) {	
	
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
	
	
	// AJAX HERE
	var scanKey = 'Scans';
	
	this.ScrollGallery.addZippy(scanKey);
	
	var thumbContents = this.ScrollGallery.getScrollables(scanKey , 'content');
	var thumbContentsWidth = utils.css.dims(thumbContents, 'width');

	for (var i = 0, len = that.scanDataPaths.length; i < len; i++) {
		//var h = i * (GLOBALS.ThumbnailWidgetHeight + 2);  	
		var scanThumb = new Thumbnail(that.scanDataPaths[i], {		  	
		  	parent: thumbContents,  	
		  	widgetCSS: {
		  		position: "relative",
		  		//top: h, 
		  		left: 0,
		  		width: thumbContentsWidth
		  	},
		  	'onloadCallbacks' : [function() { 
				/*
				 * This is to make sure the Slicer thumb resizes
				 * in proportion to the content loaded.  Every call to 'moveContents'
				 * resizes the slider thumb accordingly.s
				 */
		  		that.ScrollGallery.moveContents(that.ScrollGallery.ContentSlider, that.ScrollGallery);
		  	}]			  	
		});
		
		this.dragDropThumbnails.push(scanThumb);
	}	


	// AJAX HERE
	var slicerKey = 'Slicer'
	
	this.ScrollGallery.addZippy(slicerKey);
	
	var thumbContents = this.ScrollGallery.getScrollables(slicerKey , 'content');
	var thumbContentsWidth = utils.css.dims(thumbContents, 'width');
	
	for (var i = 0, len = that.scanDataPaths.length; i < len; i++) {
		//var h = i * (GLOBALS.ThumbnailWidgetHeight + 2);  	
		var scanThumb = new Thumbnail(that.scanDataPaths[i], {		  	
		  	parent: thumbContents,  	
		  	widgetCSS: {
		  		position: "relative",
		  		//top: h, 
		  		left: 0,
		  		width: thumbContentsWidth
		  	},
		  	'onloadCallbacks' : [function() { 
				/*
				 * This is to make sure the Slicer thumb resizes
				 * in proportion to the content loaded.  Every call to 'moveContents'
				 * resizes the slider thumb accordingly.s
				 */
		  		that.ScrollGallery.moveContents(that.ScrollGallery.ContentSlider, that.ScrollGallery);
		  	}]			  	
		});
		
		this.dragDropThumbnails.push(scanThumb);
	}
	

}