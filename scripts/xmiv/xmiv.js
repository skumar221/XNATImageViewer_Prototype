defaultArgs_xmiv = {
	id: "xmiv",
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
		border: "solid rgba(95, 95, 95, 1) 1px",
		"border-radius": "0px"	
		// for height mins and maxes, see below
	}
}







//******************************************************
//  Init
//
//******************************************************
var xmiv = function(args){

	var that = this;
	INIT(this, defaultArgs_xmiv, args, function(){});
	
	
	
	//----------------------------------
	//	WIDGET
	//----------------------------------			
	this.widget.onclick = function(){ 
		that.destroy();
	}	
	
	
	
	
	//----------------------------------
	//	MODAL
	//----------------------------------
	this.modal = __makeElement__("div", this.widget, this.args.id + "_modal", this.args._modalcss);	
	$(this.modal).css({
		"overflow-x": "hidden",
		"overflow-y": "hidden"
	})
	
	// Don't destroy when clicking on window (i.e. don't propagate)				
	this.modal.onclick = function(event, element) {
		  if (event.stopPropagation) {
		      event.stopPropagation();   // W3C model
		  } else {
		      event.cancelBubble = true; // IE model
		  }
	}

	
	
	
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	this.closeButton = __makeElement__("img", this.widget, this.args.id + "_closeIcon", {
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
	this.scrollGallery = new scrollGallery({
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
	this.scrollGallery.setContents(function(){
		that.scrollGallery.thumbs = [];
		var thumbSpacing = that.scrollGallery.args.scrollMarginY;
		var totalHeight = 0;
		  	  
		for (var i=0; i<that.scanDataPaths.length; i++){
			var h = i*(100) + thumbSpacing*i + that.scrollGallery.args.scrollMarginY;  	
			var scanThumb = new scanThumbnail(that.scanDataPaths[i], {
				  	id: "scrollContent_" + i.toString(),
				  	parent: that.scrollGallery.scrollContent,
				  	CSS: {
				  		top: h, 
				  		left: that.scrollGallery.args.scrollMarginX,
				  	}
				  });
	
				
			// We want to manage the active thumbnails...
			// we need to "deactivate" them when another has replaced
			// their slot.  
			scanThumb.addActivatedCallback(function(thumb, args){
				that.manageActiveThumbs(thumb, args);
			})
			
			
			that.scrollGallery.thumbs.push(scanThumb);
		}
		  
		  that.scrollGallery.scrollContent.style.height = __toPx__(h + that.scrollGallery.args.scrollMarginY*1 + 100);
		  that.scrollGallery.scrollContent.style.borderColor= "rgba(10, 200, 2, 1)";  
	})
	
	
	
	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	this.scanViewers = [[]];	
	this.addScanViewer(0, 0);	
	this.addScanViewer(0, 1);	

		
	
	this.updateCSS();
}








