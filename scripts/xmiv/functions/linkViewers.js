//******************************************************
//  The general idea of viewer/slider linking is this:
//  
//  when a mouse is hovering over a given viewer, we tell
//  the other viewers to "subordinate" themselves to the slider
//  of the viewer being hovered on.  We propagate the slide 
//  signal both to the left and right of the hovered viewer,
//  making sure to stop when a chain link is "broken".
//
//  Once we stop hovering over a given viewer, its propagation
//  commands are cleared.
//
//******************************************************
xmiv.prototype.linkViewers = function(leftInd, rightInd){
	
	
	var that = this;
	
	
	//-----------------------------------------
	//  VERIFY ARGUMENTS
	//-----------------------------------------
	if ((leftInd >= rightInd) || (leftInd != (rightInd -1))){
		throw "Link Viewers: Unacceptable Link Indices.  They have to be one apart, unequal, and left less than right."
	}
	
	
	
	//-----------------------------------------
	//  SET THE MOUSEOVER via JQUERY
	//-----------------------------------------
	var defineMouseover = function(that, indA){
		
		if (! that.scanViewers[indA]){
			//console.log("ERROR: ", indA, that.scanViewers);
			return;
		}

		
		$(that.scanViewers[indA].widget).mouseover(function(){
			
			
			
			//-----------------------------------------
			//  PROPAGATE RIGHT
			//-----------------------------------------
			var rInd = indA;						
			if (that.scanViewers[rInd+1]){
				while(that.scrollLinks[rInd]){
					
					if ($(that.scrollLinks[rInd]).data('activated')){
						//console.log("Prop Right " + indA + " with " + (rInd + 1));
						that.scanViewers[indA].frameSlider.linkSlider(that.scanViewers[rInd + 1].frameSlider);		
					}
					else{
						//console.log("!Prop Right " + indA + " with " + (rInd + 1) + " -- BREAK");
						break;
					}				
					rInd++;					
				}	
			}
			
			
			
			//-----------------------------------------
			//  PROPAGATE LEFT
			//-----------------------------------------
			var rInd = indA;
			if (that.scanViewers[rInd-1]){
				while(that.scrollLinks[rInd-1]){
					
					if ($(that.scrollLinks[rInd-1]).data('activated')){
						//console.log("Prop Left  " + indA + " with " + (rInd - 1));
						that.scanViewers[indA].frameSlider.linkSlider(that.scanViewers[rInd - 1].frameSlider);		
					}
					else{
						//console.log("!Prop Left  " + indA + " with " + (rInd - 1) + " -- BREAK");
						break;
					}				
					rInd--;					
				}	
			}			
		    	
			
			
			
			
		//-----------------------------------------
		//  SET THE MOUSEOUT via JQUERY
		//-----------------------------------------
		}).mouseout(function(){	
			if (that.scanViewers[indA]) { that.scanViewers[indA].frameSlider.clearLinked() };		
		});			
	}
	
	defineMouseover(that, leftInd);
	defineMouseover(that, rightInd);
}
