



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
	var spacer = iconDimMed*1.2;	
	
	//
	//  Add viewer to sliderLinker list
	//
	Globals.sliderLinker.addScanViewer(that);



	//------------------------------
	// ADD Menu div
	//------------------------------	
	this.linkMenu = __makeElement__("div", this.widget, this.args.id + "_LinkMenu_LinkMenu",{
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
	this.linkMenu.icon = __makeElement__("img", this.linkMenu, this.args.id + "_LinkMenu_Icon",{
		position: "absolute",
		left: 0,
		top: 0,// + spacer*i,
		height: iconDimSmall , 
		width: iconDimSmall ,
		cursor: "pointer", 
	});	
	this.linkMenu.icon.src = "./icons/Chain-Broken.png";
	


	//------------------------------
	// SUB MENU
	//------------------------------	
	this.linkMenu.subMenu = __makeElement__("div", this.linkMenu, this.args.id + "_LinkMenu_SubMenu",{
		position: "absolute",
		left: spacer * -6,
		top: 0,
		height: iconDimMed * 4, 
		width: spacer * 6,
		cursor: "pointer",
		border: "solid 1px rgba(100,100,100,1)"
	});	
	// For onclick purposes
	this.linkMenu.subMenu.pinned = false;


	//------------------------------
	// ADD MENU ICONS
	//------------------------------
	this.linkMenu.subMenu.icons = [];


	//
	//  SUB MENU - mouseleave
	//	
	function subMenuIconBind(icon, bind){
		if (bind){
			
			$(icon).bind('mouseenter.default', function(){
				if (that.linkMenu.iconHovered){
					$(this).stop().fadeTo(Globals.animFast, 1);
				}			
			})
			
			$(icon).bind('mouseleave.default', function(){
				if (that.linkMenu.iconHovered){
					$(this).stop().fadeTo(Globals.animFast, .5);
				}	
			});	
					
		}
		else{
			
			$(icon).unbind('mouseenter.default');
			$(icon).unbind('mouseleave.default');

		}	
	}
	



	//
	//  SUB MENU - mouseleave
	//	
	function subLeave(){

		$(that.linkMenu.subMenu).fadeOut(Globals.animFast);
		$(that.linkMenu.icon).fadeTo(Globals.animFast, .5);
		that.linkMenu.iconHovered = false;
				
	}
	
	
	//
	//  MAIN MENU - mouseenter
	//	
	function mainEnter(){

		if (that.linkMenu.iconHovered){
			
			$(that.linkMenu.icon).fadeTo(Globals.animFast, 1);
			$(that.linkMenu.subMenu).fadeIn(Globals.animFast);
						
		}	
	}
	
	
	
		
	//
	//  MAIN BINDING FUNCTION
	//
	function superBind(subMenuPinned){
		if (subMenuPinned){
			//
			// Unbind hover events to pin the subMenu
			//
			$(that.linkMenu.subMenu).unbind('mouseleave.axis');
			$(that.linkMenu).unbind('mouseenter.axis');				
		}
		else{
			//
			// Bind the hover events to unpin subMenu
			//
			$(that.linkMenu.subMenu).bind('mouseleave.axis', subLeave);
			$(that.linkMenu).bind('mouseenter.axis', mainEnter);
		}	
	}
	
	
	//------------------------------
	// 
	//------------------------------		
	function setHoverEvents(){
		
		//
		// MAIN MENU ICON - default fade state
		//
		$(that.linkMenu.icon).fadeTo(0,.5);
		
		
		//
		// SUB MENU - default fade state
		//		
		$(that.linkMenu.subMenu).fadeOut(0);
		
		
		//
		//  MAIN MENU ICON - mouseenter
		//
		$(that.linkMenu.icon).mouseenter(function(){
			that.linkMenu.iconHovered = true;
		})
		
		
		//
		// SUB MENU ICONS - mouseenter, mouseleave
		//
		for (var i=0;i<that.linkMenu.subMenu.icons.length; i++){
			
			var icon = that.linkMenu.subMenu.icons[i];
			$(icon).fadeTo(0,.5);
			subMenuIconBind(icon, true);

		}

		superBind(false);
	}	

	setHoverEvents();
}