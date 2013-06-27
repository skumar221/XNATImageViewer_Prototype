//******************************************************
//  
//
//
//******************************************************
SliderLinker.prototype.setViewerBoxClickListen = function (currViewer) {
	
	var that = this;
	
	
	this.showExisting();
		

	XV.Viewers( function (ViewerBox) {
				
		//
		//  Make a selector box if it doesn't exist'
		//
		if (!ViewerBox.selectorBox) {

			ViewerBox.selectorBox =  GLOBALS.SliderLinker.addSelectorBox( 
				ViewerBox.widget.parentNode , 
				utils.css.dims(ViewerBox.widget)
			);
				
			ViewerBox.selectorBox.style.border = 'none';	
			ViewerBox.selectorBox.ViewerBox = ViewerBox;	
			
			
			
			ViewerBox.selectorBox.onclick = function () {				
				
				var box = this;
				var viewer = box.ViewerBox;

				that.lastViewerSelected = viewer;
				that.addToLastGroup(viewer);

			}	
			
						
		} else {
			
			that.enableSelectorBox_(ViewerBox.selectorBox);
			
		}



		
		//--------------------------
		//  SELECT CURRVIEWER
		//--------------------------
		if (ViewerBox === currViewer) {
			
			ViewerBox.selectorBox.onclick();

		}		
	});

}