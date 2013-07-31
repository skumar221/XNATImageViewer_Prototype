goog.require('Viewer');
goog.provide('Viewer.populateData');
//******************************************************
//  Fill in metadata -- this will likely change as it gets 
//  deployed to the web...
//******************************************************
Viewer.prototype.populateData = function (data) {	
	var that = this;

	//----------------------------------
	// DATA: SESSION INFO DATA
	//----------------------------------
	function makeSessionInfoData(labelObj) {
		//----------------------------------
		//	SCROLL GALLERY
		//----------------------------------


		var counter = 0;
		var className = "SessionData_ScrollGallery";
		
		that.sessionInfo = new ScrollGallery({
			'parent': that.ScanTabs.getTab("Info"),
			'className': className,
			'orientation': "vertical",
			'widgetCSS': {
				'left': '0',
				'height': '80%',
				'width': '440',
				'top': XVGlobals.scanTabLabelHeight + 10
			}
		});	
		var contents = utils.dom.makeElement("div", that.sessionInfo.getScrollArea(), className + "_MetadataContents", {});
		

		
		for (i in labelObj) {
			
			var noSpace = labelObj[i]["label"].replace(/\s+/g, ' ');			
			var currTop = (that.textCSS_small.fontSize * (2*counter));



			that.displayableData[noSpace] = utils.dom.makeElement("div", contents, className + "Data_" + noSpace);
			utils.css.setCSS( that.displayableData[noSpace], utils.dom.mergeArgs(that.textCSS_small,{
				'top': currTop,
				'left': '15'
			}));
			that.displayableData[noSpace].innerHTML = labelObj[i].label + ":";		



			that.displayableData[noSpace + "_value"] = utils.dom.makeElement("div", contents, className + "Value_" + noSpace);
			utils.css.setCSS( that.displayableData[noSpace + "_value"], utils.dom.mergeArgs(that.textCSS_small,{
				'top': currTop,
				'left': '160'
			}));	
			that.displayableData[noSpace + "_value"].innerHTML = labelObj[i]["value"][0];
			
			
			
			counter++;
		}
		

		utils.css.setCSS(contents, {
			'height': currTop
		})
	}
	// NOTE:  Ajax query would be here
	makeSessionInfoData(data.sessionInfo);
}

goog.exportProperty(Viewer.prototype, 'populateData', Viewer.prototype.populateData);
