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
			border: "solid 1px rgba(" + borderColorSet[groups.length].toString() + ")",
			groupID: groupid,
			scanViewers: [],
		})		

	}

	
	this.addToLastGroup = function(scanViewer){
		
		console.log ("ADDING TO LAST GROUP: ", scanViewer.widget.id)
		if (groups[groups.length - 1].scanViewers.indexOf(scanViewer) == -1){
		
			groups[groups.length - 1].scanViewers.push(scanViewer);
		
		}
	
	}
	
	
	this.removeFromGroup = function(scanViewer){

		var tempInd;
		for (var i=0; i<groups.length; i++){
			
			tempInd = groups[i].scanViewers.indexOf(scanViewer);
			if (tempInd > -1){
				groups[i].scanViewers.splice(tempInd, 1);		
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
			border: "solid 2px rgba(255,0,0,1)",
			cursor: "pointer"
		})
		return box;
	}


	this.setScanViewers = function(viewers){
		scanViewers = viewers;
	}
	
	
	this.clearAll = function(){
		groups = [];	
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

					
		for (var i=0; i<groups.length; i++){			
			for (var j=0; j<groups[i].scanViewers.length; j++){
					

				var scanViewer = groups[i].scanViewers[j];
				var viewerSet = groups[i].scanViewers;
				
				$(scanViewer.widget).mouseover(function(){
					
					var set = Globals.sliderLinker.getViewerSetFromID(this.id);
					var scanViewer = set.viewer;
					var viewerGroup = set.viewerset;
					
					for (var k=0; k<viewerGroup.length; k++){	
											
						if (viewerGroup[k] != scanViewer){
							
							console.log("LINKING: ", viewerGroup[k].widget.id, "     WITH:     ", scanViewer.widget.id)
							
							scanViewer.frameSlider.linkSlider(viewerGroup[k].frameSlider);						
						}
						
					}	
					

				}).mouseout(function(){	
					
					var set = Globals.sliderLinker.getViewerSetFromID(this.id);
					if (set){
						var scanViewer = set.viewer;					
						scanViewer.frameSlider.clearLinked();						
					}

					
				});			
					
			}

		}
	}

		
	this.addGroup();
}
