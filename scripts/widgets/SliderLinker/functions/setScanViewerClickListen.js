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
																  				 __toInt__(ScanViewer.widget.style.top), 
																  				 __toInt__(ScanViewer.widget.style.left),
																  				 __toInt__(ScanViewer.widget.style.height),
															  				 __toInt__(ScanViewer.widget.style.width));	
			
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