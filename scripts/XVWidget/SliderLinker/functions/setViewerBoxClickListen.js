//******************************************************
//  
//
//
//******************************************************
SliderLinker.prototype.setViewerClickListen = function (currViewer) {
	
	var that = this;
	
	
	this.showExisting();
		

	XV.ViewerManager( function (Viewer) {
				
		//
		//  Make a selector box if it doesn't exist'
		//
		if (!Viewer.selectorBox) {

			Viewer.selectorBox =  GLOBALS.SliderLinker.addSelectorBox( 
				Viewer.widget.parentNode , 
				utils.css.dims(Viewer.widget)
			);
				
			Viewer.selectorBox.style.border = 'none';	
			Viewer.selectorBox.Viewer = Viewer;	
			
			
			
			Viewer.selectorBox.onclick = function () {				
				
				var box = this;
				var viewer = box.Viewer;

				that.lastViewerSelected = viewer;
				that.addToLastGroup(viewer);

			}	
			
						
		} else {
			
			that.enableSelectorBox_(Viewer.selectorBox);
			
		}



		
		//--------------------------
		//  SELECT CURRVIEWER
		//--------------------------
		if (Viewer === currViewer) {
			
			Viewer.selectorBox.onclick();

		}		
	});

}