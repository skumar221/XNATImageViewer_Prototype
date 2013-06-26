//******************************************************
//  
//
//
//******************************************************
SliderLinker.prototype.setViewerBoxClickListen = function (currViewer) {
	
	var that = this;
	
	
	this.showExisting();
	
		
	//--------------------------
	//  GET VIEWERS
	//--------------------------
	XV.Viewers( function (ViewerBox) {
		
		
		
		if (!ViewerBox.selectorBox) {

			ViewerBox.selectorBox =  GLOBALS.SliderLinker.addSelectorBox(			 ViewerBox.widget.parentNode, 
																  				 utils.convert.toInt(ViewerBox.widget.style.top), 
																  				 utils.convert.toInt(ViewerBox.widget.style.left),
																  				 utils.convert.toInt(ViewerBox.widget.style.height),
															  				 utils.convert.toInt(ViewerBox.widget.style.width));	
			
			ViewerBox.selectorBox.style.border = 'none';	
			ViewerBox.selectorBox.ViewerBox = ViewerBox;	
			
			
			
			ViewerBox.selectorBox.onclick = function () {				
				
				var box = this;
				var viewer = box.ViewerBox;

				that.lastViewerSelected = viewer;
				that.addToLastGroup(viewer);
				
				$(viewer.widget).unbind('mouseleave.linkmenu');
				$(viewer.widget).unbind('mouseenter.linkmenu');
	
	
			}				
		}
		else{
			
			that.enableSelectorBox(ViewerBox.selectorBox);
			
		}



		
		//--------------------------
		//  SELECT CURRVIEWER
		//--------------------------
		if (ViewerBox === currViewer) {
			
			ViewerBox.selectorBox.onclick();

				
		}		
	});

}