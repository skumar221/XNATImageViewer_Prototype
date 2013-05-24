//******************************************************
//  
//
//
//******************************************************
sliderLinker.prototype.setScanViewerClickListen = function(currViewer){
		
	//var linkImg = $(currViewer.widget).find("img[id*='LinkMenuImage']");
	
	
	Globals.sliderLinker.showExisting();
	
		
	//--------------------------
	//  GET VIEWERS
	//--------------------------
	var viewers = Globals.getScanViewers();
	

	
	// loop through viewers
	for (var i=0; i<viewers.length; i++){

		if (!viewers[i].selectorBox){
			viewers[i].selectorBox =  Globals.sliderLinker.addSelectorBox(			 viewers[i].widget.parentNode, 
																  				 __toInt__(viewers[i].widget.style.top), 
																  				 __toInt__(viewers[i].widget.style.left),
																  				 __toInt__(viewers[i].widget.style.height),
															  				 __toInt__(viewers[i].widget.style.width));	
			viewers[i].selectorBox.style.border = 'none';	
			viewers[i].selectorBox.scanViewer = viewers[i];			
			viewers[i].selectorBox.onclick = function(){				
				
				var box = this;
				var viewer = this.scanViewer;
							
				if (typeof box.selected === 'undefined'){
					box.selected = false;											
				}
				
				box.selected = !box.selected;
	
				Globals.sliderLinker.lastViewerSelected = viewer;
				Globals.sliderLinker.addToLastGroup(viewer);
				
				$(viewer.widget).unbind('mouseleave.linkmenu');
				$(viewer.widget).unbind('mouseenter.linkmenu');
	
				$(viewer.linkMenu).stop().fadeTo(Globals.animFast, 1, function(){
	
					$(this.childNodes[0]).stop().fadeTo(Globals.animFast, 1, function(){});
				
				});
				$(viewer.linkMenu.childNodes[0]).stop().fadeTo(Globals.animFast, 1, function(){});
	
			}				
		}
		else{
			Globals.sliderLinker.enableSelectorBox(viewers[i].selectorBox);
		}



		
		//--------------------------
		//  SELECT CURRVIEWER
		//--------------------------
		if (viewers[i] == currViewer){
			viewers[i].selectorBox.onclick();
			viewers[i].selectorBox.selected = true;
		}		
	}
}