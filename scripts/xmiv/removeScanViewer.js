function removeScanViewer(that, scanViewer){
		 
		 
		 var animLen = 500;
		 
		 // clear any Jquery actions happening on other
		 // parts of the modal.
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.horizontalContractButton).stop().unbind('mouseleave');
		 $(that.horizontalContractButton).stop().unbind('mouseover');

		 

		//-------------------------
		// Fade out viewer, then delete it
		//-------------------------			
		
		// unlink the viewer sliders from one another
		for (var i=0; i<__lengthMD__(that.scanViewers); i++){
			that.scanViewers[i].frameSlider.clearLinked();
			$(that.scanViewers[i].widget).unbind('mouseover');
			$(that.scanViewers[i].widget).unbind('mouseout');
		}	
		
		// remove viewer from global list
		var viewerInd = that.scanViewers.indexOf(scanViewer);
		that.scanViewers.splice(viewerInd , 1);
		
		if (__lengthMD__(that.scanViewers) == 0){
			that.destroy();
			return;
		}

		$(scanViewer.widget).stop().fadeTo(animLen, 0, function(){
			that.modal.removeChild(scanViewer.widget);
		});
		

		//-------------------------
		// Fade out expandButton, then delete it
		//-------------------------			
		$(that.verticalExpandButtons[viewerInd]).stop().fadeTo(animLen, 0, function(){
			that.modal.removeChild(that.verticalExpandButtons[viewerInd]);
			that.verticalExpandButtons.splice(viewerInd , 1);
		});
		
		
		//-------------------------
		// Fade out linkButton, then delete it
		//-------------------------		
		
		// check the position of the link, special case for viewerInd == 0
		scrollLinkInd = viewerInd -1;
		if (viewerInd == 0) { scrollLinkInd = 0 };

		// remember what is active and what isn't
		var activeList = [];
		
		
		// deactivate and delete all scroll links
		for (var j=0; j<that.scrollLinks.length; j++){

			// track the state of the current ones
			if (j != scrollLinkInd) { 
				activeList.push($(that.scrollLinks[j]).data('activated'));
			}
			
			// fade out the scrollLinks
			var sl = that.scrollLinks[j];
			$(sl).fadeTo(animLen, 0, function(){

				if (this == that.scrollLinks[that.scrollLinks.length - 1]){
					//console.log("HERE");
					for (var k=0; k<that.scrollLinks.length; k++){
						that.modal.removeChild(that.scrollLinks[k]);
					}
					that.scrollLinks = [];
					
					animateModalChange(that, animLen, {
						modal: [function(){
							for (var i=0; i<__lengthMD__(that.scanViewers); i++){
								if (i > 0) that.addScrollLinkIcon();	
							}
							for (var i=0; i<that.scrollLinks.length; i++){
								
								if(activeList[i]){
									that.scrollLinks[i].onclick('activate', 0);	
								}
							}
						}]
					});
				}

			});
			

		}
	
}
