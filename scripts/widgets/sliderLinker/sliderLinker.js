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
	var prevGroups = [];
	
	this.getGroups = function(){
		return groups;
	}


	this.lastGroup = function(){
		return groups[groups.length - 1];
	}	 


	this.addGroup = function(){

		groups.push({
			border: "solid 2px rgba(" + borderColorSet[groups.length].toString() + ")",
			groupID: "linkGroup_" + groups.length,
			scanViewers: [],
		})		

	}

	
	this.addToLastGroup = function(scanViewer){


		//
		//  Remove the scan viewer from group if it exists
		//
		this.removeFromGroup(scanViewer, false);
		
		
		//
		//  1. Add the scanViewer to the last group
		//
		if (groups[groups.length - 1].scanViewers.indexOf(scanViewer) == -1){
		
			groups[groups.length - 1].scanViewers.push(scanViewer);
			
			//
			//  Set the border color
			//
			scanViewer.selectorBox.style.border = this.lastGroup().border;

		}
	
	}
	
	this.clearScanViewerSliderLink = function(scanViewer){
		
		console.log("CLEARING: ", scanViewer.id)
		scanViewer.selectorBox.style.border = "none";	
		scanViewer.selectorBox.selected = false;	

		$(scanViewer.widget).unbind('mouseenter.sliderlink');
		$(scanViewer.widget).unbind('mouseleave.sliderlink');
		
		for (var i=0; i<scanViewer.widget.defaultMouseEvents.length; i++){
			
			scanViewer.widget.defaultMouseEvents[i]();
			
		}
		scanViewer.frameSlider.clearLinked();		
	}
	
	
	
	this.removeFromGroup = function(scanViewer, clear){

		var tempInd;
		for (var i=0; i<groups.length; i++){
			
			tempInd = groups[i].scanViewers.indexOf(scanViewer);
			
			if (tempInd > -1){
				
				console.log("removing ", scanViewer.widget.id, " from group ", groups[i].groupID)
				
				var viewer = groups[i].scanViewers[tempInd];
				groups[i].scanViewers.splice(tempInd, 1);		
				
				if (clear){
					scanViewer.selectorBox.selected = false;
					this.clearScanViewerSliderLink(viewer);						
				}
	
				return true;		
			}
		}
		return false;
	}
	
	
	this.removeGroup = function(scanViewer){

		var tempInd;
		for (var i=0; i<groups.length; i++){
			
			tempInd = groups[i].scanViewers.indexOf(scanViewer);
			
			if (tempInd > -1){
				
				for (var j=0; j<groups[i].scanViewers.length; j++){
					var viewer = groups[i].scanViewers[j];						
					viewer.selectorBox.selected = false;
					this.clearScanViewerSliderLink(viewer);						
				}

				if (i>0){
					groups.splice(i, 1);
				}
				else{
					groups[i].scanViewers = [];
				}
				return;
			
			}
		}
	}

	
	this.addSelectorBox = function(parent, Top, Left, Height, Width){
		var box =  __makeElement__("div", parent, "selectorBox", {
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
	
	this.clearAll = function(){
		groups = [];	
		var viewers = Globals.getScanViewers();
		for (var i=0;i<viewers.length;i++){
			
			$(viewers[i].selectorBox).remove();
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
	
	
	this.showExisting = function(delay ){
		if (!delay){
			var delay = 0;
		}
		for (var i=0; i<groups.length; i++){			
			for (var j=0; j<groups[i].scanViewers.length; j++){
				
				var viewer = groups[i].scanViewers[j];
				
				$(viewer.selectorBox).delay(delay).fadeTo(Globals.animFast, 1)
				
			}
		}
	}
	
	
	this.hideExisting = function(delay){
		if (!delay){
			var delay = 0;
		}
		for (var i=0; i<groups.length; i++){			
			for (var j=0; j<groups[i].scanViewers.length; j++){
				
				var viewer = groups[i].scanViewers[j];
				
				$(viewer.selectorBox).delay(delay).fadeTo(Globals.animFast, 0)
				
			}
		}
	}
	
	
	this.flashExisting = function(delay){
		if (!delay){
			var delay = 500;
		}
		for (var i=0; i<groups.length; i++){			
			for (var j=0; j<groups[i].scanViewers.length; j++){
				
				var viewer = groups[i].scanViewers[j];
				
				$(viewer.selectorBox).fadeTo(Globals.animFast, 1).delay(delay).fadeTo(Globals.animFast, 0)
				
			}
		}
	}
	
	
	
	this.disableSelectorBox = function(selectorBox){
		$(selectorBox).css({'pointer-events': 'none'});		
	}
	
	
	
	this.enableSelectorBox = function(selectorBox){
		$(selectorBox).css({'pointer-events': 'auto'});		
	}
	
	
	this.removePopup = function(){
//
		//  Remove the popup from the DOM
		//
		$(this.linkMenu_Popup).fadeOut(Globals.animFast).remove();		
	}
	
	
	this.takeSnapshot = function(){
		
		console.log(prevGroups)
		$.extend(prevGroups,groups);
		console.log(prevGroups)
			
	}
	
	this.cancel = function(){
		
		console.log("PREV ", prevGroups)
		groups = [];
		$.extend(groups,prevGroups);
		console.log(groups);
		this.processGroups();
			
	}
	
	this.processGroups = function(){

		console.log("PROCESS GROUPS")
		this.removePopup();
		
		
		
		//
		//  Clear all mouse-related events from selectorBoxes
		//
		var scanViewers = Globals.getScanViewers();
		for (var i=0;i<scanViewers.length;i++){

			this.disableSelectorBox(scanViewers[i].selectorBox);
			this.hideExisting(500);
			
		}
		
		
		
		//
		//  PRocess viewers that are in an existing groups
		//
		for (var i=0; i<groups.length; i++){			
			for (var j=0; j<groups[i].scanViewers.length; j++){
					

				var scanViewer = groups[i].scanViewers[j];
				var viewerSet = groups[i].scanViewers;

				
				$(scanViewer.widget).bind('mouseenter.sliderlink', function(){
					
					var set = Globals.sliderLinker.getViewerSetFromID(this.id);					
					var scanViewer = set.viewer;
					var viewerGroup = set.viewerset;
					

					
					for (var k=0; k<viewerGroup.length; k++){	
											
						if (viewerGroup[k] != scanViewer){

							scanViewer.frameSlider.linkSlider(viewerGroup[k].frameSlider);	
												
						}
						
					}	
					

				}).bind('mouseleave.sliderlink', function(){	
					
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
	
}
