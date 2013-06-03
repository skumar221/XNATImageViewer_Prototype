defaultArgsXMIV = {
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
		backgroundColor: "rgba(0,0,0,.5)",
		//"overflow-x": "hidden",
		//"overflow-y": "hidden",
		"display": "inline-block",
		"font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	},
	modalCSS: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,1)",
		//border: "solid rgba(95, 95, 95, 1) 2px",
		border: "none",
		"border-radius": "20px"	,
		// for height mins and maxes, see below
	}
}







//******************************************************
//  Init
//
//******************************************************
var XNATModalImageViewer = function (args) {

	var that = this;
	INIT(this, defaultArgsXMIV, args, function () {});
	XMIV = this;

	
	//----------------------------------
	//	WIDGET
	//----------------------------------			
	this.widget.onclick = function () { 
		that.destroy();
	}	
	
	
	
	
	//----------------------------------
	//	MODAL
	//----------------------------------
	this.modal = __makeElement__("div", this.widget, GLOBALS.ModalId, this.args.modalCSS);	
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
		width: 10,
		height: 10,
		zIndex: 103
	});	
	this.closeButton.src = "./icons/closeX.png";


	
	//----------------------------------
	//SCAN DATA PATHS - AJAX QUERY HERE
	//
	// FOR PROTOTYPING PURPOSES
	//----------------------------------	
	this.scanDataPaths = TESTSCANDATA;

	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.addScrollGallery();
	
	
	this.addRowMenu();
	this.addColumnMenu();
	
	
	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	this.ScanViewers = [];
	this.manageScanViewers();
	this.SCANViewers({
		"insert" : "column",
		"animate" : "off",
	});



	this.updateCSS();
}








