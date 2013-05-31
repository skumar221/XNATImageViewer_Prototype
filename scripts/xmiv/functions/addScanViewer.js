//******************************************************
//  Adds a ScanViewer based on the arguments.
//
//******************************************************
XMIV.prototype.addScanViewer = function (rowPos, colPos, callback) {
	var that = this;

	

	//----------------------------------
	//	1a. Validate arguments by type
	//----------------------------------
	if ((typeof rowPos != 'number')) {
		
		throw ("Invalid row argument for addScanViewer! Integer only! It's currently a " + (typeof rowPos));
		
	}
	
	if ((typeof colPos != 'number')) {
		throw ("Invalid column argument for addScanViewer! Integer only! It's currently a " + (typeof colPos));
	}




	//----------------------------------
	//	1b. Validate arguments by position
	//
	//  RULES:
	//
	//	I. You can't add a viewer unless there is a viewer that precedes it,
	//  either by column or row.  So if there is just one viewer at [0][0]
	//  and you try to add a viewer at [0][2] it will throw an error, because
	//  no viewer exists at [0][1].  Similiarly if you try to add one at [2][0]
	//  it will throw an error, because there's no viewer at [1][0].
	//
	//  II.  You can't add a viewer to an existing potion
	//----------------------------------
	
	
	//
	// 0,0 defaulted to true
	//
	var preceeding_row = (rowPos === 0) ? true: false;
	var preceeding_column = (colPos === 0) ? true: false;
	
	
	//
	// Checks to see if the position is in use
	//
	if (__lengthMD__(that.ScanViewers)> 0 && this.ScanViewers[rowPos] && this.ScanViewers[rowPos][colPos]) {
		throw("addScanViewer Error: rowPos and colPos in use!");
	}	
	

	//	
	// Checks the column preceder
	//	
	if (rowPos != 0) {
		if (this.ScanViewers[rowPos])
			if (this.ScanViewers[rowPos][colPos-1]) { preceeding_row = true}	
	}
	
	
	//
	// Checks the column preceder
	//	
	if (colPos != 0) {
		if (this.ScanViewers[rowPos-1])
			if (this.ScanViewers[rowPos-1][colPos]) { preceeding_column = true}
	}


	//
	// Throw an error if there's no preceder in row or column	
	//	
	if (preceeding_column === false && preceeding_row === false) {
		throw("addScanViewer Error: rowPos and colPos have no preceeding viewers");
	}
	

	//	
	// Create ScanViewer
	//	
	var v = new ScanViewer({
		parent: this.modal,
		id: "ScanViewer_" + __uniqueID__(),
	});		


	//	
	// create row if it doesn't exist by pushing
	// ASSUMPTION: previous rows have been created!
	//
	if (!this.ScanViewers[rowPos]) {this.ScanViewers.push([]);}
	

	//	
	// create column by pushing
	//
	this.ScanViewers[rowPos][colPos] = (v);
	

	//	
	// test the rowPos + colPos to make sure
	//	
	if (!this.ScanViewers[rowPos][colPos]) {
		throw("addScanViewer Error: it appears that rowPos and colPos doesn't exist.  Code logic should be checked");
	}
	
	
	
	
	
	//----------------------------------
	//	2. Allows Thumbnails to be dropped into viewer
	//----------------------------------
	//this.addDropZone(v.FrameViewer);	
	
	
	
	//----------------------------------
	//	Add expand buttons (only on zero counts)
	//----------------------------------
	if (!this.horizontalExpandButtons || this.horizontalExpandButtons.length == 0) {
		this.addHorizontalExpandButton();
	}
	if (!this.verticalExpandButtons || this.verticalExpandButtons.length == 0) {
		this.addVerticalExpandButton();
	}
		

	//----------------------------------
	//	SET closebutton onclick
	//----------------------------------		
	v.closeButtonClicked = function (event) { 
		
		that.deleteScanViewer(v); 
	
	};
}
