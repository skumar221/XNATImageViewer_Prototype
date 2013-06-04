//******************************************************
//  This is a general set of init procedures that is appllied
//  to the majority of javaScript objects/widgets I use.  
//  This basically creates a semblance of object-oriented programming.
//******************************************************
var INIT = function (obj, defaultArgs, args, initRoutine) {
	obj.defaultArgs = defaultArgs;
	obj.args = (args) ? utils.dom.mergeArgs(obj.defaultArgs, args) : obj.defaultArgs;
	
	obj.CSS = (obj.args.CSS) ? obj.args.CSS : obj.args.widgetCSS;
	
	obj.widget = utils.dom.makeElement("div", obj.args.parent, obj.args.id, obj.CSS);
	$(window).resize(function () {
	  obj.updateCSS();
	});
	
	if (initRoutine)
		initRoutine();
}