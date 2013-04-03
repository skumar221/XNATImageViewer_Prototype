

var __Init__ = function(obj, defaultArgs, args, initRoutine){
	obj.defaultArgs = defaultArgs;
	obj.args = (args) ? __MergeArgs__(obj.defaultArgs, args) : obj.defaultArgs;
	obj.CSS = obj.args.CSS;
	obj.widget = __MakeElement__("div", obj.args.parent, obj.args.id, obj.CSS);
	$(window).resize(function() {
	  obj.updateCSS();
	});
	
	if (initRoutine)
		initRoutine();

}
