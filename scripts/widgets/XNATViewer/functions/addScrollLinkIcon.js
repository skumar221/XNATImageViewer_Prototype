//******************************************************
//  ADD SCROLL LINK ICON
//
//******************************************************
XNATViewer.prototype.addScrollLinkIcon = function () {
	
	var that = this;

	
	//-----------------------------------------
	//  MAKE ICON
	//-----------------------------------------
	var c = utils.dom.makeElement("div", this.modal, this.args.id + "_scrollLink", {
		position: "absolute",
		width: 40,
		height: 10,
		cursor: "pointer",
		overflow: "visible",
		//backgroundColor: "rgba(200, 200, 200, .5)"
	});

	
	var icon1 = utils.dom.makeElement("img", c, this.args.id + "_scrollLinkIcon1", {
		position: "absolute",
		width: 40,
		height: 10,
	});
	icon1.src = "./icons/LinkArrow-Broken.png";
	
	var icon2 = utils.dom.makeElement("img", c, this.args.id + "_scrollLinkIcon2", {
		position: "absolute",
		width: 40,
		height: 10,
	});
	icon2.src = "./icons/LinkArrow.png";
	
	
	var label = utils.dom.makeElement("div", c, this.args.id + "_scrollLink", {
		position: "absolute",
		top: 15,
		left: -10,
		width: 200,
		color: "rgba(255,255,255,1)",
		fontSize: GLOBALS.fontSizeSmall
	});
	

	$(label).fadeTo(0,0);
	$(icon2).fadeTo(0,0);
	
	
	

	
	//-----------------------------------------
	//  STORE ICON IN ARRAY
	//-----------------------------------------	
	this.scrollLinks.push(c);
	
	
	
	
	//-----------------------------------------
	//  CUSTOM ELEMENT DATA
	//-----------------------------------------	
	$(c).data('number', this.scrollLinks.length - 1);
	$(c).data('activated', false);
	
	
	
	
	//------------------------------------------
	// CHAIN ONCLICK
	//------------------------------------------
	that.widgetOver = -1;
	var c = this.scrollLinks[this.scrollLinks.length -1];
	c.onclick = function (inputState, animTime) {
		
		var animLen = (animTime || animTime === 0) ? animTime : 300;
		//console.log("ANUIMN: ", animLen, inputState, animTime);
		if (inputState && inputState == 'deactivate') { $(c).data('activated', true);}
		else if (inputState && inputState == 'activate') { $(c).data('activated', false);}
		// Set it to the opposite
		$(c).data('activated', !$(c).data('activated'));
		
		if ($(c).data('activated')) {
			// Change the icon's image
			$(icon1).fadeTo(animLen,0);
			$(icon2).fadeTo(animLen,1);
			
			
			if (animLen != 0) {
				label.innerHTML = "Linking Scrollers";
				$(label).fadeTo(animLen,1).delay(1000).fadeTo(animLen,0);
			}
			else {
				$(label).fadeTo(animLen,0)
			}
			// Link viewers
			//console.log("linking: ", $(c).data('number'), "with ", $(c).data('number')+1);
			that.linkViewers($(c).data('number'), $(c).data('number') + 1);
		}
		else if (!$(c).data('activated')) {
			$(icon1).fadeTo(animLen,1);
			$(icon2).fadeTo(animLen,0);		
			
			if (animLen != 0) {
				label.innerHTML = "Unlinking Scrollers";
				$(label).fadeTo(animLen,1).delay(1000).fadeTo(animLen,0);
			}
			else {
				$(label).fadeTo(animLen,0)
			}
		}
	}
}