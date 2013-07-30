goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.updateMenuSliders');


ThreeDHolder.prototype.updateMenuSliders = function() {
    // update visibility buttons
    utils.array.forEach(this.objVisiblePairs, function(pair) {
        var object = pair[0];
        var button = pair[1];
        
        button.checked = object.visible ? 'checked' : '';
    });
    
    // update rendering buttons
    utils.array.forEach(this.objRenderPairs, function(pair) {
        var object = pair [0];
        var button = pair [1];
        
        button.disabled = object.visible ? '' : 'disabled';
    });
    
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
        object.lowerThreshold = object.max * 0.05 + 1;
        object.upperThreshold = object.max;
        slider.setValueAndExtent(object.lowerThreshold,
                                 object.upperThreshold - object.lowerThreshold);
        
    });
    
}
goog.exportProperty(ThreeDHolder.prototype, 'updateMenuSliders', ThreeDHolder.prototype.updateMenuSliders);

