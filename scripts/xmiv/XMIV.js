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
var XMIV = function (args) {

	var that = this;
	INIT(this, defaultArgs_XMIV, args, function () {});
	
	GLOBALS.XMIV(this);

	
	//----------------------------------
	//	WIDGET
	//----------------------------------			
	this.widget.onclick = function () { 
		that.destroy();
	}	
	
	
	
	
	//----------------------------------
	//	MODAL
	//----------------------------------
	this.modal = __makeElement__("div", this.widget, GLOBALS.ModalID, this.args.modalCSS);	
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
	
	
	
	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------	
	this.ScanViewers = [[]];	
	this.addScanViewer(0, 0);	
	this.addScanViewer(0, 1);	


	this.swapScanViewers = function(v1, v2){
		
	
		var arrLoc = this.runScanViewerLoop ( function (v, i, j) { 
			
			var byObj = (v === v1) || (v === v2);
			var byElement = (v.widget === v1) || (v.widget === v2);
			var byId = (v.widget.id === v1) || (v.widget.id === v2);
			
			if (byObj || byElement || byId) {
				return {
					"i" : i,
					"j" : j,
				}				
			}
			
		})
		
		if (arrLoc.length == 2){

			var tempViewer = this.ScanViewers[arrLoc[0].i][arrLoc[0].j];
			this.ScanViewers[arrLoc[0].i][arrLoc[0].j] = this.ScanViewers[arrLoc[1].i][arrLoc[1].j];
			this.ScanViewers[arrLoc[1].i][arrLoc[1].j] = tempViewer;

		}
		else{
			throw "SWAP ERROR: "
		}
	}
	
		
	this.getScanViewers = function(filter){
		
		var isString = (typeof filter === 'string');
		
		if (isString){
			
			var isWidgetString = (filter.toLowerCase().indexOf("widget")  === 0 );
			
			if (isWidgetString){
				var widgets = this.runScanViewerLoop( function (ScanViewer) { 
						return ScanViewer.widget;	
				})
				return widgets;						
			}
	
		}
		
		return this.ScanViewers;
	}
	
	this.ScanViewerWidgets = function() {

	}
	
	this.runScanViewerLoop = function(callback){
		
		var returnVals = [];
		var ScanViewers = this.getScanViewers();
		
		for (var i=0; i<ScanViewers.length; i++) {
			for (var j=0; j<ScanViewers[i].length; j++) {
				
				var r = callback(ScanViewers[i][j], i, j);
				if (r){
					returnVals.push(r);
				}
				
			}
		}
		
		if (returnVals.length > 0){
			if (returnVals.length === 1){
				return returnVals[0]
			}
			else{
				return returnVals;
			}
		}		
	}
	
	this.ScanViewer =  function (i, j) {	
		
		//console.log(typeof i)
		
		var isNum = ((typeof i === 'number') && (typeof j === 'number'));
		var isString = ((typeof i === 'string'));
		 
		if (isNum){
			return this.ScanViewers[i][j];						
		}

		if (isString){
			var id = i;
			
			var v = this.runScanViewerLoop( function(ScanViewer) {
				if (ScanViewer.widget.id == id) {
					return ScanViewer
				}			
			})
			
			if (v){
				return v;
			}
		}
	}

	this.updateCSS();
}








