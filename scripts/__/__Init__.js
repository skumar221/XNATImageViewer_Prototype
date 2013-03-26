

var __Init__ = function(obj, defaultArgs, args, initRoutine){
	obj.defaultArgs = defaultArgs;
	obj.args = (args) ? mergeArgs(obj.defaultArgs, args) : obj.defaultArgs;
	obj._css = obj.args._css;
	obj.widget = __MakeElement__("div", obj.args.parent, obj.args.id, obj._css);
	$(window).resize(function() {
	  obj.updateCSS();
	});
	
	if (initRoutine)
		initRoutine();
	
	if(obj.updateCSS) 
		obj.updateCSS();
}