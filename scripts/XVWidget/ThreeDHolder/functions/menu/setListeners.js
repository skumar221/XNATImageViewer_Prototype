goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.setListenerRadio');
goog.provide('ThreeDHolder.setListenerDropdown');
goog.provide('ThreeDHolder.setListenerVisible');
goog.provide('ThreeDHolder.setListenerRender');
goog.provide('ThreeDHolder.setListenerOpacity');
goog.provide('ThreeDHolder.setListenerThresh');


ThreeDHolder.prototype.setListenerMaster = function(master) {
    goog.events.listen(master, goog.ui.Component.EventType.CHANGE, function(event) {
        console.log('setting all to be ' + this.checked);
    });
    
};


ThreeDHolder.prototype.setListenerRadio = function(newObj, radio) {
    var that = this;
    goog.events.listen(radio, goog.ui.Component.EventType.CHANGE, function(event) {
//        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
//        that.currentVolObject.visible = false;  ////////////////
//        newObj.visible = true;  /////////////////////
        
        that.update2Drenderers(newObj);
    });
}


ThreeDHolder.prototype.setListenerVisible = function(newObj, visible, toggle) {
    var that = this;
    goog.events.listen(visible, goog.ui.Component.EventType.CHANGE, function(event) {
        
        newObj.visible = this.checked;
        newObj.modified();
        var checked = this.checked;
        
        // disable/enable other options
        utils.array.forEach(toggle, function(e) {
            // if js component
            if (e.nodeType == 1) {
                if (e.getAttribute('class') == 'Newline') {
                    e.style.display = '';
                }
                else
                    e.style.display = (checked) ? 'inline-block' : 'none';
            }
            
            // if goog component
            else {
                e.setVisible(checked);
                e.getElement().style.display = (checked) ? 'inline-block' : 'none';
            }
        });
    });
}


ThreeDHolder.prototype.setListenerRender = function(newObj, render) {
    goog.events.listen(render, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.volumeRendering = this.checked;
    });
}


ThreeDHolder.prototype.setListenerOpacity = function(newObj, opacity) {
    goog.events.listen(opacity, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.opacity = opacity.getValue();
    });
}


ThreeDHolder.prototype.setListenerThresh = function(newObj, thresh) {
    goog.events.listen(thresh, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.lowerThreshold = thresh.getValue();
        newObj.upperThreshold = thresh.getValue() + thresh.getExtent();
    });
}


goog.exportProperty(ThreeDHolder.prototype, 'setListenerRadio', ThreeDHolder.prototype.setListenerRadio);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerDropdown', ThreeDHolder.prototype.setListenerDropdown);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerVisible', ThreeDHolder.prototype.setListenerVisible);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerRender', ThreeDHolder.prototype.setListenerRender);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerOpacity', ThreeDHolder.prototype.setListenerOpacity);
goog.exportProperty(ThreeDHolder.prototype, 'setListenerThresh', ThreeDHolder.prototype.setListenerThresh);
