//******************************************************
//  
//
//
//******************************************************
SliderLinker.prototype.setScanViewerClickListen = function (currViewer) {
	
	var that = this;
	
	
	this.showExisting();
	
		
	//--------------------------
	//  GET VIEWERS
	//--------------------------
	var viewers = GLOBALS.getScanViewers();
	

	
	// loop through viewers
	for (var i=0; i<viewers.length; i++) {

		if (!viewers[i].selectorBox) {

			viewers[i].selectorBox =  GLOBALS.SliderLinker.addSelectorBox(			 viewers[i].widget.parentNode, 
																  				 __toInt__(viewers[i].widget.style.top), 
																  				 __toInt__(viewers[i].widget.style.left),
																  				 __toInt__(viewers[i].widget.style.height),
															  				 __toInt__(viewers[i].widget.style.width));	
			
			viewers[i].selectorBox.style.border = 'none';	
			viewers[i].selectorBox.ScanViewer = viewers[i];			
			
			viewers[i].selectorBox.onclick = function () {				
				
				var box = this;
				var viewer = this.ScanViewer;


				that.lastViewerSelected = viewer;
				that.addToLastGroup(viewer);
				
				$(viewer.widget).unbind('mouseleave.linkmenu');
				$(viewer.widget).unbind('mouseenter.linkmenu');

				
				
	
			}				
		}
		else{
			
			this.enableSelectorBox(viewers[i].selectorBox);
			
		}



		
		//--------------------------
		//  SELECT CURRVIEWER
		//--------------------------
		if (viewers[i] == currViewer) {
			
			viewers[i].selectorBox.onclick();

				
		}		
	}
}