



//******************************************************
//  
//
//******************************************************
scanViewer.prototype.addLinkMenu = function(){

	var that = this;	
	var iconStartLeft = 5;
	var iconStartTop = 25;
	var imgDiv = 7;
	var iconDimSmall = 20;
	var iconDimMed = 35;


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
	// ADD Menu img (child of Menu DIV)
	//------------------------------	
	this.linkMenu_Image = __makeElement__("img", this.linkMenu, this.args.id + "_ViewTypeTab_LinkMenuImage",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
		opacity: .5
	});	
	this.linkMenu_Image.src = "./icons/Chain-Broken.png";

	
	//
	//  HOVER FADES
	//
	$(this.linkMenu).mouseover(function(){
		$(this).find("img").stop().fadeTo(Globals.animFast, 1);
	}).mouseleave(function(){
		$(this).find("img").stop().fadeTo(Globals.animFast, .5);
	})
	
	
	
	this.linkMenu.onclick = function(){	
		
		if (that.selectorBox)
			console.log(that.selectorBox.selected)
		if (that.selectorBox && that.selectorBox.selected){
			Globals.sliderLinker.removeFromGroup(that);
		}
		else{
			$(Globals.sliderLinker.linkMenu_Popup).fadeIn(Globals.animFast);	
	
			Globals.sliderLinker.lastViewerSelected = that;
			
			Globals.sliderLinker.setScanViewerClickListen(that);	
		}
	}


	

}