goog.require('Modal');
goog.provide('Modal.addScrollGallery')

/**
 * @private
 * @expose
 */
Modal.prototype.addScrollGallery = function () {	
	var that = this;


	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	/**
	 * @expose
	 */
	this.ScrollGallery = new ScrollGallery({
		parent: that.modal,
		orientation: "vertical",
		widgetCSS: {
			left: 0,
			top: that.args.marginTop,
			height: 700
		}
	});	

	
	
	//----------------------------------
	//	SCAN THUMBNAIL
	//----------------------------------
	// AJAX HERE
	var scanKey = 'Scans';
	
	that.ScrollGallery.addZippy(scanKey);
	
	var thumbContents = that.ScrollGallery.getScrollables(scanKey , 'content');
	var thumbContentsWidth = utils.css.dims(thumbContents, 'width');
	
	
	
	
	utils.array.forEach(that.scanDataPaths, function(dataPath) { 
		that.dragDropThumbnails.push(new ScanThumbnail(dataPath, {		  	
		  	parent: thumbContents,  	
		  	widgetCSS: {
		  		position: "relative",
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
		}));	
	})

	

	//--------------------------------
	// SLICER THUMBNAIL
	//--------------------------------
	// AJAX HERE
	var slicerKey = 'Slicer'
	that.ScrollGallery.addZippy(slicerKey);
	var thumbContents = that.ScrollGallery.getScrollables(slicerKey , 'content');
	var thumbContentsWidth = utils.css.dims(thumbContents, 'width');
	
						//
	utils.array.forEach(that.scanDataPaths, function(dataPath) { 	
		//--------------------------------
		// ********AMANDA CODE HERE*******
		//  
		//  ScanThumbnail should now be slicer thumbnail
		//--------------------------------
		

		
		// REPLACE THE BELOW LINE....
		that.dragDropThumbnails.push(new ScanThumbnail(dataPath, {	
			  	
		// WITH THIS BELOW LINE...
		// that.dragDropThumbnails.push(new SlicerThumbnail(dataPath, {		
		  	parent: thumbContents,  	
		  	widgetCSS: {
		  		position: "relative",
		  		left: 0,
		  		width: thumbContentsWidth
		  	},
		  	'onloadCallbacks' : [function() { 
				// KEEP THUS
		  		that.ScrollGallery.moveContents(that.ScrollGallery.ContentSlider, that.ScrollGallery);
		  	}]			  	
		}));	
	})

	
}
goog.exportProperty(Modal.prototype, 'addScrollGallery', Modal.prototype.addScrollGallery); 
