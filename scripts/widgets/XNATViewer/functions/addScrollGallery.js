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
	
	
	// set the contents
	this.ScrollGallery.setContents(function () {
		
		that.ScrollGallery.thumbs = [];
		
		var totalHeight = 0;		  	  
		for (var i=0; i<that.scanDataPaths.length; i++) {

			var h = i * (GLOBALS.ThumbnailWidgetHeight + 2);  	

			var scanThumb = new ScanThumbnail(that.scanDataPaths[i], {
				
			  	id: "ScanThumbnail_" + i.toString(),			  	
			  	parent: that.ScrollGallery.ScrollContent,
			  	
			  	widgetCSS: {
			  		top: h, 
			  		left: 0,
			  		width: $(that.ScrollGallery.ScrollContent).width() -2
			  	}
			  	
			});
	
				
			// We want to manage the active Thumbnails...
			// we need to "deactivate" them when another has replaced
			// their slot.  
			
			/*
			scanThumb.addActivatedCallback(function (thumb, args) {
				that.manageActiveThumbs(thumb, args);
			})
			*/
			
			that.ScrollGallery.thumbs.push(scanThumb);
		}
		  
		that.ScrollGallery.ScrollContent.style.height = utils.convert.px(h + that.ScrollGallery.args.scrollMarginY*1 + 100);
		that.ScrollGallery.ScrollContent.style.borderColor= "rgba(10, 200, 2, 1)";  
	})
}