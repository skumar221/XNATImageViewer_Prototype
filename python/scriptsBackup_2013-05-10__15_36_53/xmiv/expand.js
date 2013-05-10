xmiv.prototype.expand = function(rowPos, colPos){
		 
	 var that = this;
	 
	 var animLen = 500;
	 
	 // clear any Jquery actions happening on other
	 // parts of the modal.
	 $(this.modal).stop();
	 $(this.closeButton).stop();
	 $(this.horizontalExpandButton).stop().unbind('mouseleave');
	 $(this.horizontalExpandButton).stop().unbind('mouseover');

	 

	//-------------------------
	// Add a scan viewer, then hide it
	//-------------------------		
	this.addScanViewer(rowPos, colPos);
	$(this.scanViewers[rowPos][colPos].widget).fadeTo(0,0);

	
	//-------------------------
	//  GET THE MODAL DIMENSIONS, 
	//-------------------------	
	 var modalDims = this.modalDims();
	 console.log("TOPS:  ", modalDims.scanViewer.tops)
	 console.log("LEFTS: ", modalDims.scanViewer.lefts)

	

	this.animateModalChange(animLen, {
		modal: [
			function(){
				//this.addScrollLinkIcon()
				$(that.scanViewers[rowPos][colPos].widget).fadeTo(animLen,1);
			}
		]
	});
	return;

}