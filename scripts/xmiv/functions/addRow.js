xmiv.prototype.addRow = function(){
	
	 var that = this;

	 
	 // clear any Jquery actions happening on other
	 // parts of the modal.
	 $(this.modal).stop();
	 $(this.closeButton).stop();



	//-------------------------
	// Add a scan viewer, then hide it
	//-------------------------		
	var newRow = this.scanViewers.length;
	for (var i=0; i<this.scanViewers[0].length; i++){
		this.addScanViewer(newRow, i);
		$(this.scanViewers[newRow][i].widget).fadeTo(0,0);
	}




	//-------------------------
	//  Animate Modal Change
	//-------------------------	
	this.animateModalChange(Globals.animMed, {
		modal: [
			function(){
				
				for (var i=0; i<that.scanViewers[0].length; i++){
					
					$(that.scanViewers[that.scanViewers.length-1][i].widget).fadeTo(Globals.animMed,1);
					
				}
			}
		]
	});		
}