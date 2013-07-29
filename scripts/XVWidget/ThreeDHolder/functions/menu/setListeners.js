

ThreeDHolder.prototype.setListenerRadio = function(newObj, radio) {
    var that = this;
    goog.events.listen(radio, goog.ui.Component.EventType.CHANGE, function(event) {
        that.currentVolObject = newObj;
        that.update2Drenderers(newObj);
    });
}


ThreeDHolder.prototype.setListenerVisible = function(newObj, visible, toggle) {
    goog.events.listen(visible, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.visible = this.checked;
        var checked = this.checked;
        
        // disable/enable other options
        utils.array.forEach(toggle, function(e) {
            // if js component
            if (e.nodeType == 1) e.disabled = (checked) ? '' : 'disabled';
            
            // if goog component
            else e.setEnabled(checked);
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


