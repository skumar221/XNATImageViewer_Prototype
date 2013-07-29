//******************************************************
//  
//******************************************************
goog.provide('utils.oo.init');

utils.oo.init = function (obj, defaultArgs, args, initRoutine) {
	obj.defaultArgs = defaultArgs;
	
	obj.args = (args) ? utils.dom.mergeArgs(obj.defaultArgs, args) : obj.defaultArgs;
	
	obj.CSS = (obj.args.CSS) ? obj.args.CSS : obj.args.widgetCSS;
	
	obj.widget = utils.dom.makeElement("div", obj.args.parent, obj.args.className, obj.CSS);

	
	if (initRoutine)
		initRoutine();
}

goog.exportSymbol('utils.oo.init', utils.oo.init);
