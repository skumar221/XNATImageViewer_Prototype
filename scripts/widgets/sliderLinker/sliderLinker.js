//******************************************************
//  Init
//
//******************************************************
var sliderLinker = function(args){
	
	
	this.maxGroups = Globals.maxScrollLinkGroups;
	
	var scanViewers = [];
	
	var borderColorSet = [
		[255,255,255,1],
		[155,205,5,1],
		[21,2,200,1],
		[25,200,55,1],
		[200,5,200,1],
		[0,255,0,1],
		[0,200,0,1],
		[0,0,200,1],
		[200,0,0,1],
		[200,200,0,1],
	];
	

	
	var groups = [];
	this.getGroups = function(){
		return groups;
	}


	this.lastGroup = function(){
		return groups[groups.length - 1];
	}	 


	this.addGroup = function(){
		var groupid = __uniqueID__();
		groups.push({
			border: "solid 2px rgba(" + borderColorSet[groups.length].toString() + ")",
			groupID: groupid,
			scanViewers: [],
		})		

	}

	
	this.addToLastGroup = function(scanViewer){

		if (groups[groups.length - 1].scanViewers.indexOf(scanViewer) == -1){
		
			groups[groups.length - 1].scanViewers.push(scanViewer);
			
			
			//
			//  Set the border color
			//
			scanViewer.selectorBox.style.border = this.lastGroup().border;
			scanViewer.linkMenu_Image.src =  "./icons/Chain-Closed.png";
		}
	
	}
	
	this.clearScanViewerSliderLink = function(scanViewer){
		
		scanViewer.selectorBox.style.border = "none";	
		scanViewer.selectorBox.selected = false;	
		scanViewer.linkMenu_Image.src =  "./icons/Chain-Broken.png";
		$(scanViewer.widget).unbind();
		
		for (var i=0; i<scanViewer.widget.defaultMouseEvents.length; i++){
			
			scanViewer.widget.defaultMouseEvents[i]();
			
		}
		scanViewer.frameSlider.clearLinked();		
	}
	
	this.removeFromGroup = function(scanViewer){

		var tempInd;
		for (var i=0; i<groups.length; i++){
			
			tempInd = groups[i].scanViewers.indexOf(scanViewer);
			
			if (tempInd > -1){
				
				var viewer = groups[i].scanViewers[tempInd];
				groups[i].scanViewers.splice(tempInd, 1);		
				
				scanViewer.selectorBox.selected = false;
				this.clearScanViewerSliderLink(viewer);				
			}
		}
	}

	
	this.addSelectorBox = function(parent, Top, Left, Height, Width){
		var box =  __makeElement__("div", parent,"SelectorBox", {
			position: "absolute",
			top: Top,
			left: Left,
			height: Height,
			width: Width,
			border: "solid 3px rgba(255,0,0,1)",
			cursor: "pointer"
		})
		return box;
	}


	this.setScanViewers = function(viewers){
		scanViewers = viewers;
	}
	
	
	
	this.addScanViewer = function(viewer){
		
		if (scanViewers.indexOf(viewer) == -1){
			
			scanViewers.push(viewer);
			
		}
	}
	
	
	
	this.addScanViewers = function(viewers){
		
		for (var i=0; i<viewers.length; i++){
			var viewer = viewers[i];
			
			if (scanViewers.indexOf(viewer) == -1){
				
				scanViewers.push(viewer);
				
			}
		}
	}
	
	this.getScanViewers = function(){
		return scanViewers;
	}
	
	this.clearAll = function(){
		groups = [];	
		for (var i=0;i<scanViewers.length;i++){
			//scanViewer.selectorBox.style.cursor = "default";
			$(scanViewers[i].selectorBox).remove();
		}
	}
	
	this.getViewerSetFromID = function(ID){
		for (var i=0; i<groups.length; i++){			
			for (var j=0; j<groups[i].scanViewers.length; j++){
				if (groups[i].scanViewers[j].widget.id == ID){
					return {
						viewer: groups[i].scanViewers[j],
						viewerset: groups[i].scanViewers,
					}
				}
			}
		}		
	}
	
	this.processGroups = function(){


		//
		//  Clear all mouse-related events from selectorBoxes
		//
		
		for (var i=0;i<scanViewers.length;i++){
			//scanViewer.selectorBox.style.cursor = "default";
			$(scanViewers[i].selectorBox).unbind();
			$(scanViewers[i].selectorBox).css({'pointer-events': 'none'});
			$(scanViewers[i].selectorBox).fadeTo(Globals.animFast,0);
		}
		
		
		
		//
		//  PRocess viewers that are in an existing groups
		//
		for (var i=0; i<groups.length; i++){			
			for (var j=0; j<groups[i].scanViewers.length; j++){
					

				var scanViewer = groups[i].scanViewers[j];
				var viewerSet = groups[i].scanViewers;

				
				$(scanViewer.widget).mouseenter(function(){
					
					var set = Globals.sliderLinker.getViewerSetFromID(this.id);					
					var scanViewer = set.viewer;
					var viewerGroup = set.viewerset;
					

					
					for (var k=0; k<viewerGroup.length; k++){	
											
						if (viewerGroup[k] != scanViewer){

							scanViewer.frameSlider.linkSlider(viewerGroup[k].frameSlider);	
												
						}
						
					}	
					

				}).mouseleave(function(){	
					
					var set = Globals.sliderLinker.getViewerSetFromID(this.id);
					if (set){
						var scanViewer = set.viewer;					
						scanViewer.frameSlider.clearLinked();						
					}

					
				});	
						
				//$(scanViewer.widget).mouseenter();	
			}
			
		}
	}

		
	this.addGroup();
	this.addLinkMenuPopup();
}
