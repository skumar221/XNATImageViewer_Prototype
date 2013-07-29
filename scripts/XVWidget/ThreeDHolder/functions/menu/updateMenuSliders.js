

ThreeDHolder.prototype.updateMenuSliders = function() {
    // update opacity sliders
    utils.array.forEach(this.objOpacityPairs, function(pair) {
        var object = pair[0];
        var slider = pair[1];
        
        slider.setValue(parseFloat(object.opacity));
        slider.setEnabled(object.visible);
    });
    
    // update threshold sliders
    utils.array.forEach(this.objThreshPairs, function(pair) {
        var object = pair[0];
        var slider = pair[1];
        
        slider.setEnabled(object.visible);
        slider.setMinimum(object.min);
        slider.setMaximum(object.max);
        slider.setValueAndExtent(object.max * 0.05 + 1, object.max * 0.95 - 1);
        object.lowerThreshold = object.max * 0.05 + 1;
        object.upperThreshold = object.max;
        
    });
    
}

