goog.require('PlaneHolder');
goog.provide('PlaneHolder.updateCSS');

//******************************************************
//  updateCSS
//******************************************************
PlaneHolder.prototype.updateCSS = function (args) {
    // update widget css to be right size/place within frame holder
    if (args) {
        var widgetDims = utils.dom.mergeArgs(utils.css.dims(this.widget), args);
        utils.css.setCSS(this.widget, widgetDims);
    }
    
    // update inner canvases to be 100%
    if (this.Renderer) {
        this.Renderer.onResize_();
    }
}
goog.exportProperty(PlaneHolder.prototype, 'updateCSS', PlaneHolder.prototype.updateCSS);
