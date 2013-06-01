//******************************************************
//  Init
//
//******************************************************
var SliderLinker = function (args) {
	
	
	this.maxGroups = GLOBALS.maxScrollLinkGroups;
	
	var ScanViewers = [];
	
	var borderColorSet = [
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
	
	this.getGroups = function () {
		return groups;
	}


	this.lastGroup = function () {
		return groups[groups.length - 1];
	}	 


	this.addGroup = function () {

		groups.push({
			border: "solid 2px rgba(" + borderColorSet[groups.length].toString() + ")",
			groupID: "linkGroup_" + groups.length,
			ScanViewers: [],
			prevViewers: [],
		})		

	}

	
	this.addToLastGroup = function (ScanViewer) {

		//("ADD TO LAST GROUP: ", ScanViewer.widget.id)
		//
		//  Remove the scan viewer from group if it exists
		//
		this.removeFromGroup(ScanViewer, false);
		
		
		//
		//  1. Add the ScanViewer to the last group
		//
		if (groups[groups.length - 1].ScanViewers.indexOf(ScanViewer) == -1) {
		
			//("HERE - last group: ", this.lastGroup().border)
			groups[groups.length - 1].ScanViewers.push(ScanViewer);
			
			//
			//  Set the border color
			//
			ScanViewer.selectorBox.style.border = this.lastGroup().border;
			$(ScanViewer.selectorBox).fadeTo(GLOBALS.animFast, 1);
			//(ScanViewer.selectorBox.style.border)

		}
	
	}
	
	this.clearSelectorBox = function (ScanViewer) {
		
		//("CLEARING SELECTOR BOX of ", ScanViewer.widget.id)
		ScanViewer.selectorBox.style.border = "none";		

		$(ScanViewer.widget).unbind('mouseenter.sliderlink');
		$(ScanViewer.widget).unbind('mouseleave.sliderlink');
		
		for (var i=0; i<ScanViewer.widget.defaultMouseEvents.length; i++) {
			
			ScanViewer.widget.defaultMouseEvents[i]();
			
		}
		ScanViewer.FrameSlider.clearLinked();		
	}
	
	
	
	this.removeFromGroup = function (ScanViewer, clearSelectorBox) {

		var tempInd;
		for (var i=0; i<groups.length; i++) {
			
			tempInd = groups[i].ScanViewers.indexOf(ScanViewer);
			
			if (tempInd > -1) {
				
				//("removing ", ScanViewer.widget.id, " from group ", groups[i].groupID)
				
				var viewer = groups[i].ScanViewers[tempInd];
				groups[i].ScanViewers.splice(tempInd, 1);		
				
				if (clearSelectorBox) {
					this.clearSelectorBox(viewer);						
				}
	
				return true;		
			}
		}
		return false;
	}
	
	
	this.removeGroup = function (ScanViewer) {

		var tempInd;
		for (var i=0; i<groups.length; i++) {
			
			tempInd = groups[i].ScanViewers.indexOf(ScanViewer);
			
			if (tempInd > -1) {
				
				for (var j=0; j<groups[i].ScanViewers.length; j++) {
					var viewer = groups[i].ScanViewers[j];						

					this.clearSelectorBox(viewer);						
				}

				if (i>0) {
					groups.splice(i, 1);
				}
				else{
					groups[i].ScanViewers = [];
				}
				return;
			
			}
		}
	}

	
	this.addSelectorBox = function (parent, Top, Left, Height, Width) {
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
	
	
	this.clearAll = function () {
			
		
		XMIV.SCANViewers( function(ScanViewer) {
				that.removeFromGroup(ScanViewer, true);
		});

		groups = [];
		this.addGroup();
	}
	
	
	
	this.getViewerSetFromID = function (ID) {
		for (var i=0; i<groups.length; i++) {			
			for (var j=0; j<groups[i].ScanViewers.length; j++) {
				if (groups[i].ScanViewers[j].widget.id == ID) {
					return {
						viewer: groups[i].ScanViewers[j],
						viewerset: groups[i].ScanViewers,
					}
				}
			}
		}		
	}
	
	
	this.showExisting = function (delay ) {
		
		var delayVal = (delay) ? delay: 0;

		for (var i=0; i<groups.length; i++) {			
			for (var j=0; j<groups[i].ScanViewers.length; j++) {
				
				var viewer = groups[i].ScanViewers[j];
				
				$(viewer.selectorBox).delay(delayVal).fadeTo(GLOBALS.animFast, 1)
				
			}
		}
	}
	
	
	this.hideExisting = function (delay) {
		
		var delayVal = (delay) ? delay: 0;
		
		if (!this.stayVisible) { 
			for (var i=0; i<groups.length; i++) {			
				for (var j=0; j<groups[i].ScanViewers.length; j++) {
					
					var viewer = groups[i].ScanViewers[j];
					
					$(viewer.selectorBox).delay(delayVal).fadeTo(GLOBALS.animFast, 0)
					
				}
			}		
		};

	}
	
	
	this.flashExisting = function (delay) {
		
		var delayVal = (delay) ? delay: 500;
		
		for (var i=0; i<groups.length; i++) {			
			for (var j=0; j<groups[i].ScanViewers.length; j++) {
				
				var viewer = groups[i].ScanViewers[j];
				
				$(viewer.selectorBox).fadeTo(GLOBALS.animFast, 1).delay(delayVal).fadeTo(GLOBALS.animFast, 0)
				
			}
		}
	}
	
	
	
	this.disableSelectorBox = function (selectorBox) {
		$(selectorBox).css({'pointer-events': 'none'});		
	}
	
	

	this.enableSelectorBox = function (selectorBox) {
		$(selectorBox).css({'pointer-events': 'auto'});		
	}
	

	
	this.takeSnapshot = function () {
		
		for (var i=0; i<groups.length; i++) {			
			for (var j=0; j<groups[i].ScanViewers.length; j++) {
				
				var viewer = groups[i].ScanViewers[j];
				groups[i].prevViewers.push(viewer);
				
			}
		}
			
	}
	
	this.cancel = function () {
		
		for (var i=0; i<groups.length; i++) {		
			
			for (var j=0; j<groups[i].ScanViewers.length; j++) {
				
				this.clearSelectorBox(groups[i].ScanViewers[j]);
				
			}
			
			groups[i].ScanViewers = groups[i].prevViewers;
			groups[i].prevViewers = [];		

			this.hideExisting();
		}	
		

		this.processGroups();			
	}
	
	this.processGroups = function () {
		
		
		//
		//  Clear all mouse-related events from selectorBoxes
		//
		var ScanViewers = XMIV.ScanViewers;
	
		// loop through viewers
		for (var i=0; i<ScanViewers.length; i++) {
			for (var j=0; j<ScanViewers[i].length; j++) {

				this.disableSelectorBox(ScanViewers[i].selectorBox);
				this.hideExisting(500);
			
			}
		}
		
		
		
		//
		//  PRocess viewers that are in an existing groups
		//
		for (var i=0; i<groups.length; i++) {			
			for (var j=0; j<groups[i].ScanViewers.length; j++) {

				var ScanViewer = groups[i].ScanViewers[j];
				var viewerSet = groups[i].ScanViewers;

				
				$(ScanViewer.widget).bind('mouseenter.sliderlink', function () {
					
					var set = GLOBALS.SliderLinker.getViewerSetFromID(this.id);					
					var ScanViewer = set.viewer;
					var viewerGroup = set.viewerset;
					

					
					for (var k=0; k<viewerGroup.length; k++) {	
											
						if (viewerGroup[k] != ScanViewer) {

							ScanViewer.FrameSlider.linkSlider(viewerGroup[k].FrameSlider);	
												
						}
						
					}	
					

				}).bind('mouseleave.sliderlink', function () {	
					
					var set = GLOBALS.SliderLinker.getViewerSetFromID(this.id);
					if (set) {
						var ScanViewer = set.viewer;					
						ScanViewer.FrameSlider.clearLinked();						
					}

					
				});	
			}
			
		}
	}

		
	this.addGroup();
	
}
