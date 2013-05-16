xmiv.prototype.expandByColumn = function(rowPos){
	
	 var that = this;
	 
	 var animLen = 500;
	 
	 // clear any Jquery actions happening on other
	 // parts of the modal.
	 $(this.modal).stop();
	 $(this.closeButton).stop();
	 $(this.horizontalExpandButtons).stop().unbind('mouseleave');
	 $(this.horizontalExpandButtons).stop().unbind('mouseover');



	//-------------------------
	// Add a scan viewer, then hide it
	//-------------------------		
	var colPos = this.scanViewers[rowPos].length;
	this.addScanViewer(rowPos, colPos);
	$(this.scanViewers[rowPos][colPos].widget).fadeTo(0,0);
	
	
	//-------------------------
	// 3. Remove vertical expand buttons and regenerate
	//-------------------------	
	this.regenerateExpandButtons_Vert(__numColumns__(this.scanViewers));


	
	//-------------------------
	//  GET THE MODAL DIMENSIONS, 
	//-------------------------	
	 var modalDims = this.modalDims();
	

	this.animateModalChange(animLen, {
		modal: [
			function(){
				//this.addScrollLinkIcon()
				$(that.scanViewers[rowPos][colPos].widget).fadeTo(animLen,1);
			}
		]
	});	
}

xmiv.prototype.expandByRow = function(colPos){
	
	 var that = this;
	 
	 var animLen = 500;
	 
	 // clear any Jquery actions happening on other
	 // parts of the modal.
	 $(this.modal).stop();
	 $(this.closeButton).stop();
	 $(this.verticalExpandButtons).stop().unbind('mouseleave');
	 $(this.verticalExpandButtons).stop().unbind('mouseover');



	//-------------------------
	// Add a scan viewer, then hide it
	//-------------------------		
	var rowPos = 0;
	if (this.scanViewers[rowPos][colPos]){
		while(this.scanViewers[rowPos] && this.scanViewers[rowPos][colPos]){
			
			rowPos++;
			
		}		
	}

	this.addScanViewer(rowPos, colPos);
	$(this.scanViewers[rowPos][colPos].widget).fadeTo(0,0);
	

	
	//-------------------------
	// 3. Remove horizontal expand buttons and regenerate
	//-------------------------	
	this.regenerateExpandButtons_Horiz(this.scanViewers.length);


	
	//-------------------------
	//  GET THE MODAL DIMENSIONS, 
	//-------------------------	
	 var modalDims = this.modalDims();
	

	this.animateModalChange(animLen, {
		modal: [
			function(){
				//this.addScrollLinkIcon()
				$(that.scanViewers[rowPos][colPos].widget).fadeTo(animLen,1);
			}
		]
	});		
}