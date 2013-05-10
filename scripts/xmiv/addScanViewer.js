//******************************************************
//  Adds a scanViewer based on the arguments.
//  If no arguments, defaulted to 1
//
//******************************************************
xmiv.prototype.addScanViewer = function(rowPos, colPos, callback){
	that = this;

	
	console.log(" ")
	console.log("ADDING VIWER AT: ", rowPos, colPos);
	//----------------------------------
	//	1a. Validate arguments by type
	//----------------------------------
	if ((typeof rowPos != 'number')){
		throw ("Invalid row argument for addScanViewer! Integer only! It's currently a " + (typeof rowPos));
	}
	
	if ((typeof colPos != 'number')){
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
	
	
	// 0,0 defaulted to true
	var preceeding_row = (rowPos === 0) ? true: false;
	var preceeding_column = (colPos === 0) ? true: false;
	
	
	// Checks to see if the position is in use
	if (__lengthMD__(that.scanViewers)> 0 && this.scanViewers[rowPos] && this.scanViewers[rowPos][colPos]){
		throw("addScanViewer Error: rowPos and colPos in use!");
	}	
	
	
	// Checks the column preceder
	if (rowPos != 0){
		if (this.scanViewers[rowPos-1][colPos]) { preceeding_row = true}
	}
	
	
	// Checks the column preceder
	if (colPos != 0){
		if (this.scanViewers[rowPos][colPos-1]) { preceeding_column = true}
	}


	// Throw an error if there's no preceder in row or column	
	if (preceeding_column === false && preceeding_row === false){
		throw("addScanViewer Error: rowPos and colPos have no preceeding viewers");
	}
	
	
	// Create scanViewer
	var v = new scanViewer({
		parent: this.modal,
		id: this.args.id + "_scanViewer_" + __uniqueID__(),
	});		


	// create row if it doesn't exist by pushing
	// ASSUMPTION: previous rows have been created!
	if (!this.scanViewers[rowPos]) {this.scanViewers.push([]);}
	
	
	// create column by pushing
	this.scanViewers[rowPos].push(v);
	
	
	// test the rowPos + colPos to make sure
	if (!this.scanViewers[rowPos][colPos]) {
		throw("addScanViewer Error: it appears that rowPos and colPos doesn't exist.  Code logic should be checked");
	}
	
	
	
	
	
	//----------------------------------
	//	2. Link viewers to other modal widgets
	//----------------------------------
	this.setDropZones(v.frameViewer);	
	this.createVerticalExpandButton(rowPos, colPos);
	v.closeButtonClicked = function(event){ that.removeScanViewer(v) };
	
}
