xmiv.prototype.addColumn = function(rowPos){
	
	 var that = this;

	 
	 // clear any Jquery actions happening on other
	 // parts of the modal.
	 $(this.modal).stop();
	 $(this.closeButton).stop();



	//-------------------------
	// Add scan viewer(s), then hide
	//-------------------------		
	var colPos = this.scanViewers[rowPos].length;
	for (var i=0; i<this.scanViewers.length; i++){
		this.addScanViewer(i, colPos);	
		$(this.scanViewers[i][colPos].widget).fadeTo(0,0);
	}
	

	//-------------------------
	//  GET THE MODAL DIMENSIONS, 
	//-------------------------	

	this.animateModalChange(Globals.animMed, {
		modal: [
			function(){
				
				for (var i=0; i<that.scanViewers.length; i++){
					
					$(that.scanViewers[i][colPos].widget).fadeTo(Globals.animMed,1);
				}
			}
		]
	});	
}