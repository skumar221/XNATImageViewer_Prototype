function borderHighlightOnHover(elt, beforeCSS, afterCSS, animtime, beforeCallback, afterCallback) {
	if (!elt)
		throw("HoverAnim in utils.js: need to apply element")
	
	if (!beforeCSS)
		beforeCSS = {
			"border-color": "rgba(50,50,50,1)",
		}
			
	if (!afterCSS)
		afterCSS = {
			"border-color": "rgba(200,200,200,1)",
		}
		
	if (!animtime)
		animtime = 100;
	if (!beforeCallback)
		beforeCallback = function () {};
	if (!afterCallback)
		afterCallback = function () {};
		
	$(elt).mouseenter(function () {
	  $(elt).stop().animate(afterCSS, animtime, beforeCallback);
	}).mouseleave(
		function () { 
		$(elt).stop().animate(beforeCSS, animtime, afterCallback);	
	});
}