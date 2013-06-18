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
	XV.Viewers( function (ScanViewer) {
		
		
		
		if (!ScanViewer.selectorBox) {

			ScanViewer.selectorBox =  GLOBALS.SliderLinker.addSelectorBox(			 ScanViewer.widget.parentNode, 
																  				 utils.convert.toInt(ScanViewer.widget.style.top), 
																  				 utils.convert.toInt(ScanViewer.widget.style.left),
																  				 utils.convert.toInt(ScanViewer.widget.style.height),
															  				 utils.convert.toInt(ScanViewer.widget.style.width));	
			
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
		if (ScanViewer === currViewer) {
			
			ScanViewer.selectorBox.onclick();

				
		}		
	});

}