XMIV.prototype.addColumn = function (rowPos) {
	
	 var that = this;

	 
	 // clear any Jquery actions happening on other
	 // parts of the modal.
	 $(this.modal).stop();
	 $(this.closeButton).stop();



	//-------------------------
	// Add scan viewer(s), then hide
	//-------------------------		
	var colPos = this.ScanViewers[rowPos].length;
	for (var i=0; i<this.ScanViewers.length; i++) {
		this.addScanViewer(i, colPos);	
		$(this.ScanViewers[i][colPos].widget).fadeTo(0,0);
	}
	

	//-------------------------
	//  GET THE MODAL DIMENSIONS, 
	//-------------------------	

	this.animateModalChange(GLOBALS.animMed, {
		modal: [
			function () {
				
				for (var i=0; i<that.ScanViewers.length; i++) {
					
					$(that.ScanViewers[i][colPos].widget).fadeTo(GLOBALS.animMed,1);
				}
			}
		]
	});	
}