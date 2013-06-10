//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addViewPlaneMenu = function(){

	var that = this;	
	var iconStartLeft = 7;
	var iconStartTop = 7;
	var imgDiv = 7;
	var iconDimSmall = 23;
	var iconDimMed = 35;
	var spacer = iconDimMed*1.2;	
	var iconVals = ['Sagittal', 'Coronal', 'Transverse', '3D'];



	//------------------------------
	// ADD Menu div
	//------------------------------	
	this.AxisMenu = utils.dom.makeElement("div", this.widget, this.args.id + "_ViewTypeTab_AxisMenu",{
		position: "absolute",
		left: iconStartLeft,
		top: iconStartTop,// + spacer*i,
		height: iconDimMed , 
		width: iconDimMed * (iconVals.length + 2),
		border: "sold 1px rgba(100,100,100,1)"
	});
	
	
	
	
	//------------------------------
	// ADD TO DEFAULT MOUSE EVENTS
	//------------------------------
	this.widget.defaultMouseEvents.push(function(){
		$(that.AxisMenu).fadeOut(0);
		$(that.widget).bind('mouseenter.axismenu', function(){
			$(that.AxisMenu).stop().fadeTo(Globals.animFast,1);
		}).bind('mouseleave.axismenu', function(){
			$(that.AxisMenu).stop().fadeTo(Globals.animFast,0);
		})		
	})
	this.widget.defaultMouseEvents[this.widget.defaultMouseEvents.length -1]();
	
	
	
	
	//------------------------------
	// ADD Menu img (child of Menu DIV)
	//------------------------------	
	var AxisMenu_Image = utils.dom.makeElement("img", this.AxisMenu, this.args.id + "_ViewTypeTab_AxisMenuImage",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
	});	
	AxisMenu_Image.src = "./icons/Axes.png";



	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.menuIcons = [];	
	for (var i=0; i<iconVals.length; i++){
		
		//
		// ADD Menu Icon
		//	
		var icon = utils.dom.makeElement("img", this.AxisMenu, this.args.id + "_ViewTypeTab_" + iconVals[i] + "Icon",{
			position: "absolute",
			left: iconStartLeft + spacer*(i+1),
			top: 0,
			height: iconDimMed , 
			width: iconDimMed ,
			cursor: "pointer", 
		});	
		icon.src = "./icons/" + iconVals[i] + ".png";
		icon.axis = iconVals[i];
		
		
		//
		// ADD Menu Icon to global list	
		//		
		this.menuIcons.push(icon);				
		
		
		//
		// SET hover events
		//
		$(icon).fadeTo(0,0);		
		$(icon).mouseenter(function(){
			$(this).stop().fadeTo(200,1);
		}).mouseleave(function(){
			$(this).stop().fadeTo(0,.5);
		});				
		
		
		//
		// SET onclick
		//
		if (icon.axis != "3D"){
			icon.onclick = function(){ 
				if (that.FrameViewer.frames.length > 0){
					
					that.FrameViewer.loadFramesByViewPlane(this.axis, that.axisIcons);
				} 
			};		
		}	
	}	
	
	
	
	//------------------------------
	// 
	//------------------------------		
	function fadeOutMenuIcons(){
		
		AxisMenu_Image.hasmouseover = false;
		//
		// Hide icons when leaving menu div
		//
		for (var x in that.menuIcons){
			$(that.menuIcons[x]).stop().fadeTo(300, 0);
		}
	}
	
	
	//------------------------------
	// 
	//------------------------------		
	function fadeInMenuIcons(){
		
		AxisMenu_Image.hasmouseover = true;
		//
		// Fade in when hovering over menu image
		//
		for (var x in that.menuIcons){
			$(that.menuIcons[x]).stop().fadeTo(300, .5);
		}
		
	}
	
	
	//------------------------------
	// 
	//------------------------------		
	function setMenuImageHover(){

		$(AxisMenu_Image).fadeTo(0, .5);
		
		$(AxisMenu_Image).mouseenter(function(){
			
			$(this).stop().fadeTo(300,1);				
			fadeInMenuIcons();
			
		}).mouseleave(function(){
			
			$(this).stop().fadeTo(300, .5);
			
		});			
	}
	
	
	
	//------------------------------
	// 
	//------------------------------		
	function setMenuDivMouseleave(){
		
		$(that.AxisMenu).mouseleave(function(){		
			
			fadeOutMenuIcons();
			
		});			
		
	}
	
	
	//------------------------------
	// 
	//------------------------------		
	function setMenuHover(){
		
		setMenuImageHover();
		setMenuDivMouseleave();		
		
	}
	
	
	//------------------------------
	// 
	//------------------------------		
	function clearMenuHover(){
		
		$(that.AxisMenu).unbind('mouseenter');
		$(that.AxisMenu).unbind('mouseleave');
		$(AxisMenu_Image).unbind('mouseenter');		
		$(AxisMenu_Image).unbind('mouseleave');		
		
	}
	
	
	//------------------------------
	// 
	//------------------------------		
	function setMenuImageClick(){	
			
		AxisMenu_Image.clicked = false;	
		$(AxisMenu_Image).stop().fadeTo(300, .5);
		
		$(AxisMenu_Image).click(function(){
			
			this.clicked = !this.clicked;
			
			if (this.clicked){
				
				$(this).stop().fadeTo(300,1);
				fadeInMenuIcons();		
				clearMenuHover();
			
			}
			else{
				
				$(this).stop().fadeTo(300, .5);
				fadeOutMenuIcons();		
				setMenuHover();
				
			}	
		})		
	}



	setMenuImageHover();
	setMenuDivMouseleave();
	setMenuImageClick();
}