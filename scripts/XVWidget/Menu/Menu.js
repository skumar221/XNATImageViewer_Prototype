
goog.provide('Menu');

goog.require('goog.ui.TwoThumbSlider');
goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
Menu = function(args) {
    goog.base(this, utils.dom.mergeArgs(Menu.prototype.defaultArgs, args));
    
    /**
	 * @type {ScrollGallery}
	 */
    this.Content = new ScrollGallery({
        'parent': this.widget,
        'className': 'Menu_ScrollGallery',
        'orientation': 'vertical',
        'widgetCSS': {
            'left': 0,
            'height': '90%',
            'width': '100%',
            'top': XVGlobals.scanTabLabelHeight + 10
        }
    });
    this.Content.getScrollArea().style.position = 'absolute';
    this.Content.getScrollArea().style.height = '100%';
    this.Content.getScrollArea().style.right = '0';
    this.Content.getScrollArea().style.paddingRight = '10px';
//    this.Scrollarea = utils.dom.makeElement('div', this.Content.getScrollArea(), 'Menu_ScrollGallery_MetadataContents', {overflow: 'auto', height: '100%'});
    
}
goog.inherits(Menu, XVWidget);
goog.exportSymbol('Menu', Menu);


Menu.prototype.defaultArgs = {
	'className': XVGlobals.classNames.Menu,
	'parent': document.body,
	'CSS': {
        'position': 'absolute',
		'height': '100%',
		'width': '100%',
        'top': '0%',
        'left': '0%',
        'display': 'inline'
//        'margin': '20px',
  	}
}



Menu.prototype.buttonCSS = {
//    'vertical-align': 'bottom',
    'margin': '3px 3px 0px 3px'
}

Menu.prototype.labelCSS = {
    'top': '3px',
    'width': '45%',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
    'display': 'inline-block'
}

Menu.prototype.defaultSliderCSS = {
    'position': 'relative',
    'width': '15%',
    'height': '3px',
    'border-radius': '4px',
    'background': '#888',
    'display': 'inline-block'
}

Menu.prototype.sliderLabelCSS = {
    'margin-right': '5px',
    'display': 'inline-block',
    'width': '80px',
    'text-align': 'right'
}
