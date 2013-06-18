goog.require('goog.ui.ProgressBar');

utils.gui.progressBar = function (parent, args) {

  
	
	var progBar = {};	
	
	// 
	// Widget
	//
	progBar.widget = utils.dom.makeElement('div', parent, 'ProgressWidget', {
		position: 'absolute',
		marginLeft: '25%',
		width: '50%',
		marginTop : '50%'
	});
	


	// 
	// Label
	//
	progBar.label = utils.dom.makeElement('div', progBar.widget, 'ProgressBar_Label', {
		fontFamily: GLOBALS.fontFamily,
		color: 'rgba(255,255,255)',
		fontSize: 11
	});
	progBar.label.innerHTML = 'Loading...'
	


	// 
	// Bar
	//
	progBar.bar = utils.dom.makeElement('div', progBar.widget, 'ProgressBar', {
		height: 10,
		borderRadius: 'none',
		position: 'relative',
		top: 5,
		'backgroundColor': 'rgb(0,0,0)',
		'borderRadius': 0,
		'border': 'solid 1px rgba(125,125,125)'
	});	
	// 
	// Bar - style
	//
	$(progBar.bar).progressbar();
	$(progBar.bar).removeClass('ui-corner-all');
	$(progBar.bar).removeClass('ui-widget-content');
	$(progBar.bar.chidren).removeClass('ui-widget-header');
	var pVal =  $(progBar.bar).find( '.ui-progressbar-value' );
	pVal.css({
    	'background': 'rgb(180,180,180)',
    	'borderRadius' : 0,
    	'border' : 'solid 1px rgb(180,180,180)'
    });	


	
	// 
	// update
	//
	progBar.update = function (args) {
	
		var isClear = (args['clear']) ? args['clear'] : false;
		var isMax = (args['max']) ? args['clear'] : false;
		var isAdd = (args['add']) ? args['add'] : false;		
		var isLabel = (args['label']) ? args['label'] : false;		
				
		if (isClear) {
			$(progBar.bar).progressbar('option', 'value', 0 );
		}
		
		if (isMax) {
			$(progBar.bar).progressbar('option', 'max', args['max'] );
		}
		
		if (isAdd) {
			$(progBar.bar).progressbar('option', 'value', $(progBar.bar).progressbar( 'option', 'value' ) + 1);
		}
		
		if (isLabel) {
			progBar.label.innerHTML = args['label'];
		}		
		
	}
	
	progBar.hide = function () {
		$(progBar.widget).fadeOut(0);
	}
	
	progBar.show = function () {
		$(progBar.widget).fadeIn(0);
	}
	
	
	return progBar;
}