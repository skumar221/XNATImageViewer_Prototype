window.onload = function () {
	
	var d = new Date();
	var startTime = d.getTime();
	
	
	var uScripts = [
	
		"./scripts/utils/utils.js" ,
		"./scripts/utils/utils.convert.js" ,
		"./scripts/utils/utils.css.js" ,
		"./scripts/utils/utils.dom.js" ,
		"./scripts/utils/utils.globals.js" ,
		"./scripts/utils/utils.gui.js" ,
		"./scripts/utils/utils.oo.js" ,
		

		"./scripts/utils/convert/int.js" ,
		"./scripts/utils/convert/pct.js" ,
		"./scripts/utils/convert/px.js" ,
		"./scripts/utils/convert/remap1D.js" ,


		"./scripts/utils/css/absolutePosition.js" ,
		"./scripts/utils/css/setCSS_jquery.js" ,
		"./scripts/utils/css/totalHeight.js" ,
		"./scripts/utils/css/totalWidth.js" ,

		
		"./scripts/utils/dom/addCallbackManager.js" ,
		"./scripts/utils/dom/debug.js" ,
		"./scripts/utils/dom/getMouseXY.js" ,
		"./scripts/utils/dom/makeElement.js" ,
		"./scripts/utils/dom/mergeArgs.js" ,
		"./scripts/utils/dom/stopPropagation.js" ,
		"./scripts/utils/dom/uniqueId.js" ,
		"./scripts/utils/dom/validateArgs.js" ,
		
		"./scripts/utils/globals/globals.js" ,
		
		"./scripts/utils/gui/dialogBox.js" ,
		"./scripts/utils/gui/draggable_jquery.js" ,
		"./scripts/utils/gui/horizontalSlider.js" ,
		"./scripts/utils/gui/progressBar_jquery.js" ,
		"./scripts/utils/gui/verticalSlider.js" ,
		
		"./scripts/utils/oo/init.js" ,
	]



	var uCount = 0;
	//for (var i=0; i<uScripts.length; i++) {
		
		//console.log(i, uScripts[i])
	
	/*
	$.getScript(uScripts, function(ata, textStatus) {
		//console.log(textStatus); //success
		//console.log(jqxhr.status); //200
		//uCount++;
		//console.log(uCount);
		//console.log(data.indexOf('utils'))
		//if (data.indexOf('utils.oo.init') > -1) {
		console.log("here")
		var n = d.getTime();
		console.log("UtilsLoad: ", n - startTime)
		var _ooo = new XNATViewer();
		//}
	});	
	//}
	*/
	
	/*
	function gs(script) {


			$.ajax({
				
				url: script,
		    	dataType: 'script',
				async: true,
				complete: function () {
					uCount++;
					if (uScripts[uCount]) {
						gs(uScripts[uCount]);
					}
					else {
						//console.log(uCount)
						//var n = d.getTime();
						//console.log(utils)
						//console.log("UtilsLoad: ", n - startTime)
									
					}					
				}
		  
			})
	}

	gs(uScripts[uCount])
	*/

	var _ooo = new XNATViewer();	
	
}