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
	XV.ScanViewers( function (ScanViewer) {
		
		
		
		if (!ScanViewer.selectorBox) {

			ScanViewer.selectorBox =  GLOBALS.SliderLinker.addSelectorBox(			 ScanViewer.widget.parentNode, 
																  				 utils.convert.int(ScanViewer.widget.style.top), 
																  				 utils.convert.int(ScanViewer.widget.style.left),
																  				 utils.convert.int(ScanViewer.widget.style.height),
															  				 utils.convert.int(ScanViewer.widget.style.width));	
			
			ScanViewer.selectorBox.style.border = 'none';	
			ScanViewer.selectorBox.ScanViewer = ScanViewer;	
			
			
			
			ScanViewer.selectorBox.onclick = function () {				
				
				var box = this;
				var viewer = box.ScanViewer;

				that.lastViewerSelected = viewer;
				that.addToLastGroup(viewer);
				
				$(viewer.widget).unbind('mouseleave.linkmenu');
				$(viewer.widget).unbind('mouseenter.linkmenu');
	
	
			}				
		}
		else{
			
			that.enableSelectorBox(ScanViewer.selectorBox);
			
		}



		
		//--------------------------
		//  SELECT CURRVIEWER
		//--------------------------
		if (ScanViewer == currViewer) {
			
			ScanViewer.selectorBox.onclick();

				
		}		
	});

}