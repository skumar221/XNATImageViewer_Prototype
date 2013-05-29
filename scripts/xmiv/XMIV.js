defaultArgs_XMIV = {
	id: "XMIV",
	layout: "all_columns",
	numViewers: 1,
	parent: document.body,
	minLeft: 50,
	minTop: 20,
	compressWidth: .33,
	expandWidth: .9,
	expanded: false,
	gutter: 10,
	marginWidth: 50,
	marginTop: 10,
	marginLeft: 10,
	expandButtonWidth: 30,
	galleryWidth: 100,
	MINIMUMHEIGHT: 400,
	heightPct: .90,
	CSS: {
		position: "fixed",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,.95)",
		//"overflow-x": "hidden",
		//"overflow-y": "hidden",
		"display": "inline-block",
		"font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	},
	_modalcss: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,1)",
		border: "solid rgba(95, 95, 95, 1) 2px",
		"border-radius": "20px"	
		// for height mins and maxes, see below
	}
}







//******************************************************
//  Init
//
//******************************************************
var XMIV = function (args) {

	var that = this;
	INIT(this, defaultArgs_XMIV, args, function () {});
	
	
	
	//----------------------------------
	//	WIDGET
	//----------------------------------			
	this.widget.onclick = function () { 
		that.destroy();
	}	
	
	
	
	
	//----------------------------------
	//	MODAL
	//----------------------------------
	this.modal = __makeElement__("div", this.widget, "modal", this.args._modalcss);	
	$(this.modal).css({
		"overflow-x": "hidden",
		"overflow-y": "hidden"
	})
	
	// Don't destroy when clicking on window (i.e. don't propagate)				
	this.modal.onclick = function (event, element) {

		 __stopPropagation__(event);   // W3C model
	
	}

	
	
	
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	this.closeButton = __makeElement__("img", this.widget, "closeIcon", {
		position: "absolute", 
		cursor: "pointer",
		width: 20,
		height: 20,
		zIndex: 103
	});	
	this.closeButton.src = "./icons/closeButton.png";


	
	//----------------------------------
	//SCAN DATA PATHS - AJAX QUERY HERE
	//
	// FOR PROTOTYPING PURPOSES
	//----------------------------------	
	this.scanDataPaths = TESTSCANDATA;

	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.ScrollGallery = new ScrollGallery({
		parent: this.modal,
		orientation: "vertical",
		widgetCSS: {
			left: this.args.gutter,
			top: this.args.marginTop,
			height: 700,
			border: "solid rgba(90,90,90,1) 0px"
		}
	});	
	// set the contents
	this.ScrollGallery.setContents(function () {
		that.ScrollGallery.thumbs = [];
		var thumbSpacing = that.ScrollGallery.args.scrollMarginY;
		var totalHeight = 0;
		  	  
		for (var i=0; i<that.scanDataPaths.length; i++) {
			var h = i*(100) + thumbSpacing*i + that.ScrollGallery.args.scrollMarginY;  	
			var scanThumb = new ScanThumbnail(that.scanDataPaths[i], {
				  	id: "scrollContent_" + i.toString(),
				  	parent: that.ScrollGallery.scrollContent,
				  	CSS: {
				  		top: h, 
				  		left: that.ScrollGallery.args.scrollMarginX,
				  	}
				  });
	
				
			// We want to manage the active thumbnails...
			// we need to "deactivate" them when another has replaced
			// their slot.  
			scanThumb.addActivatedCallback(function (thumb, args) {
				that.manageActiveThumbs(thumb, args);
			})
			
			
			that.ScrollGallery.thumbs.push(scanThumb);
		}
		  
		  that.ScrollGallery.scrollContent.style.height = __toPx__(h + that.ScrollGallery.args.scrollMarginY*1 + 100);
		  that.ScrollGallery.scrollContent.style.borderColor= "rgba(10, 200, 2, 1)";  
	})
	
	
	
	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	this.ScanViewers = [[]];	
	this.addScanViewer(0, 0);	
	this.addScanViewer(0, 1);	

		
	
	this.updateCSS();
}








