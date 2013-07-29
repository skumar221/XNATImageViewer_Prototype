
//******************************************************
//  Init
//******************************************************
goog.provide('PlaneDHolder');

goog.require('X.renderer3D');
goog.require('X.renderer2D');
goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
PlaneHolder = function(id, Holder, args) {
	goog.base(this, utils.dom.mergeArgs(PlaneHolder.prototype.defaultArgs, args));
	
    this.ThreeDHolder = Holder;
	
	//----------------------------------
	//	ONLOAD CALLBACKS
	//----------------------------------
	this.onloadCallbacks = [];
    
    this.widget.id = id + '_' + this.widget.id;
    goog.dom.classes.add(this.widget, id + 'Plane');
    
    
    //----------------------------------
    // CREATE RENDERER
    //----------------------------------
    if (id !== 'v') {
        this.Renderer = new X.renderer2D();
        this.Renderer.orientation = id.toUpperCase();
        this.addSliderAndFrameNum(id);
    } else {
        this.Renderer = new X.renderer3D();
    }
    
    this.Renderer.container = this.widget.id;
    this.Renderer.init();
    
    if (id === 'v') {
        this.Renderer.render();
    }
    
    //	this.updateCSS();
}
goog.inherits(PlaneHolder, XVWidget);
goog.exportSymbol('PlaneHolder', PlaneHolder);



/*
 * @type {object}
 * @protected
 */
PlaneHolder.prototype.defaultArgs = {
	className: XVGlobals.classNames.PlaneHolder,
	parent: document.body,
	blankMsg : "drag and drop Thumbnail here",
	CSS: {
		position: 'absolute',
		height: '50%',
		width: '50%',
        top: '0%',
        left: '0%',
		"overflow": "hidden",
        'display': 'inline',
        'background': '#000',
  	}
}

PlaneHolder.prototype.sliderDefaultArgs = {
    position: 'absolute',
    left: '5%',
    bottom: '10px',
    width: '90%',
    height: '3px',
    'border-radius': '4px',
    background: '#4AA',
    opacity: '0',
}

PlaneHolder.prototype.frameNumDefaultArgs = {
    position: 'absolute',
    width: '90%',
    left: '5%',
    bottom: '16px',
    color: '#ddd',
    'font-size': '10px',
    opacity: '0',
}

PlaneHolder.prototype.labelDefaultArgs = {
    position: 'absolute',
    'font-size': '8px',
    color: '#fff',
    opacity: 0.5,
    'text-transform': 'uppercase',
}

PlaneHolder.prototype.addSliderAndFrameNum = function(id) {
    var color = (id === 'x') ? 'rgba(255,255,0,1)' :
                (id === 'y') ? 'rgba(0,  255,0,1)' :
                               'rgba(255,0,  0,1)';
    
    
    var s = utils.dom.makeElement('div', this.widget, 'sliceSlider',
        utils.dom.mergeArgs(this.sliderDefaultArgs, {background: color}));
    goog.dom.classes.add(s, id + 'Slice');
    
    var b = utils.dom.makeElement('div', this.widget, 'box', this.frameNumDefaultArgs );
    goog.dom.classes.add(b, id + 'Box');
    
    // allow sliders and indexes to disappear on hover out
    this.ThreeDHolder.fadeOnHoverOut.push(s);
    this.ThreeDHolder.fadeOnHoverOut.push(b);
}

PlaneHolder.prototype.addLabels = function(id) {
    var n, s, w, e;
    
    switch (id) {
        case 'x': n = 's', s = 'i', w = 'a', e = 'p'; break;
        case 'y': n = 's', s = 'i', w = 'r', e = 'l'; break;
        case 'z': n = 'a', s = 'p', w = 'r', e = 'l'; break;
    }
    
    var north = utils.dom.makeElement('div', this.widget, 'LetterLabel',
        utils.dom.mergeArgs(this.labelDefaultArgs, { left: '50%', top: '10%', }));
    var south = utils.dom.makeElement('div', this.widget, 'LetterLabel',
        utils.dom.mergeArgs(this.labelDefaultArgs, { left: '50%', top: '85%', }));
    var west = utils.dom.makeElement('div', this.widget, 'LetterLabel',
        utils.dom.mergeArgs(this.labelDefaultArgs, { left: '10%', top: '50%', }));
    var east = utils.dom.makeElement('div', this.widget, 'LetterLabel',
        utils.dom.mergeArgs(this.labelDefaultArgs, { left: '85%', top: '50%', }));
    north.innerHTML = n;
    south.innerHTML = s;
    west.innerHTML = w;
    east.innerHTML = e;
}



//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
PlaneHolder.prototype.addOnloadCallback = function (callback) {
	this.onloadCallbacks.push(callback)
}
