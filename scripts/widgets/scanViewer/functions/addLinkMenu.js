



//******************************************************
//  
//
//******************************************************
scanViewer.prototype.addLinkMenu = function(){

	var that = this;	
	
	var iconStartTop = 5;
	var imgDiv = 7;
	var iconDimSmall = 25;
	var iconDimMed = 35;
	var iconStartLeft = $(this.widget).width() - 20;

	//
	//  Add viewer to sliderLinker list
	//
	Globals.sliderLinker.addScanViewer(that);


	//------------------------------
	// ADD Menu div
	//------------------------------	
	this.linkMenu = __makeElement__("div", this.widget, this.args.id + "_ViewTypeTab_LinkMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,// + spacer*i,
		height: iconDimMed , 
		width: iconDimMed,
		border: "sold 1px rgba(100,100,100,1)"
	});
	this.linkMenu.closed = false;




	//------------------------------
	// ADD TO DEFAULT MOUSE EVENTS
	//------------------------------
	this.widget.defaultMouseEvents.push(function(){
		$(that.linkMenu).fadeOut(0);
		$(that.widget).bind('mouseenter.linkmenu', function(){
			$(that.linkMenu).stop().fadeTo(Globals.animFast,1);
		}).bind('mouseleave.linkmenu', function(){
			$(that.linkMenu).stop().fadeTo(Globals.animFast,0);
		})	
	})
	this.widget.defaultMouseEvents[this.widget.defaultMouseEvents.length -1]();



	
	//------------------------------
	// ADD Menu img (child of Menu DIV)
	//------------------------------	
	this.linkMenu_Image = __makeElement__("img", this.linkMenu, this.args.id + "_ViewTypeTab_LinkMenuImage",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
	});	
	this.linkMenu_Image.src = "./icons/Chain-Broken.png";



	
	//
	//  HOVER FADES
	//
	$(this.linkMenu).mouseenter(function(){
		$(this).find("img").stop().fadeTo(Globals.animFast, 1);
				
		if (that.selectorBox && that.selectorBox.selected){
		
			//$(that.selectorBox).fadeTo(Globals.animFast, 1);
			
		}	
			

		
	}).mouseleave(function(){
		$(this).find("img").stop().fadeTo(Globals.animFast, .5)
		
		if (that.selectorBox && that.selectorBox.selected){
			
			//$(that.selectorBox).fadeOut(Globals.animFast);
			
		}	
	})
	

	
	
	this.linkMenu.onclick = function(){	
		
		if (that.selectorBox && that.selectorBox.selected){
			Globals.sliderLinker.removeFromGroup(that);
		}
		else{
			$(Globals.sliderLinker.linkMenu_Popup).fadeIn(Globals.animFast);	

			Globals.sliderLinker.setScanViewerClickListen(that);
		}
	}


	

}