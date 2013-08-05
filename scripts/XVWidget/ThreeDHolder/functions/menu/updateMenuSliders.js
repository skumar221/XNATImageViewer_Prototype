goog.require('ThreeDHolder');
goog.provide('ThreeDHolder.updateMenuSliders');


ThreeDHolder.prototype.updateMenuSliders = function() {
    
    // update visibility buttons
    utils.array.forEach(this.objVisiblePairs, function(pair) {
        var object = pair[0];
        var button = pair[1];
        var newline = pair[3];
        var spacer = pair[4];
        
        button.checked = object.visible ? 'checked' : '';
        if (newline) newline.style.display = '';
        if (spacer) spacer.style.display = object.visible ? '' : 'none';
    });
    
    // update rendering buttons
    utils.array.forEach(this.objRenderPairs, function(pair) {
        var object = pair [0];
        var button = pair [1];
        var label = pair [2];
        
        button.style.display = object.visible ? 'inline-block' : 'none';
        label.style.display = object.visible ? 'inline-block' : 'none';
    });
    
    // update opacity sliders
    utils.array.forEach(this.objOpacityPairs, function(pair) {
        var object = pair[0];
        var slider = pair[1];
        var label = pair[2];
        
        slider.setValue(parseFloat(object.opacity));
        slider.setVisible(object.visible);
        slider.getElement().style.display = object.visible ? 'inline-block' : 'none';
        label.style.display = object.visible ? 'inline-block' : 'none';
    });
    
    // update threshold sliders
    utils.array.forEach(this.objThreshPairs, function(pair) {
        var object = pair[0];
        var slider = pair[1];
        var label = pair[2];
        
        slider.setMinimum(object.min);
        slider.setMaximum(object.max);
        object.lowerThreshold = object.max * 0.05 + 1;
        object.upperThreshold = object.max;
        slider.setValueAndExtent(object.lowerThreshold,
                                 object.upperThreshold - object.lowerThreshold);
        
        slider.getElement().style.display = object.visible ? 'inline-block' : 'none';
        label.style.display = object.visible ? 'inline-block' : 'none';
    });
    
}
goog.exportProperty(ThreeDHolder.prototype, 'updateMenuSliders', ThreeDHolder.prototype.updateMenuSliders);

