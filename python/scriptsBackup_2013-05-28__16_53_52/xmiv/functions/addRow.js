XMIV.prototype.addRow = function () {
	
	 var that = this;

	 
	 // clear any Jquery actions happening on other
	 // parts of the modal.
	 $(this.modal).stop();
	 $(this.closeButton).stop();



	//-------------------------
	// Add a scan viewer, then hide it
	//-------------------------		
	var newRow = this.ScanViewers.length;
	for (var i=0; i<this.ScanViewers[0].length; i++) {
		this.addScanViewer(newRow, i);
		$(this.ScanViewers[newRow][i].widget).fadeTo(0,0);
	}




	//-------------------------
	//  Animate Modal Change
	//-------------------------	
	this.animateModalChange(Globals.animMed, {
		modal: [
			function () {
				
				for (var i=0; i<that.ScanViewers[0].length; i++) {
					
					$(that.ScanViewers[that.ScanViewers.length-1][i].widget).fadeTo(Globals.animMed,1);
					
				}
			}
		]
	});		
}