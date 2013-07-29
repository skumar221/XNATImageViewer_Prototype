Menu.prototype.addFolder = function(title) {
    var folder = utils.dom.makeElement('div', this.Scrollarea, 'Folder', this.folderCSS);
    var fHeader = utils.dom.makeElement('div', folder, 'FolderHeader', this.folderHeaderCSS);
    var fContent = utils.dom.makeElement('div', folder, 'FolderContent');
    
    fHeader.innerHTML = title;
    
    return fContent;
}


// guiObject (string) slider, ttslider, checkbox, radio
Menu.prototype.add = function(guiObject, folder, label, values, file) {
    var newGuiObject;
    switch (guiObject) {
        case 'checkbox':
        case 'radio':
            newGuiObject = this.addInputButton(guiObject, folder, label, file, values);
            break;
        
        case 'slider':
            newGuiObject = this.addSlider(folder, label, values);
            break;
        
        case 'ttslider':
            newGuiObject = this.addTTSlider(folder, label, values);
            break;
        
        case 'newline':
            newGuiObject = utils.dom.makeElement('div', folder, 'Newline', {
                width: '100%',
                height: '1px',
            });
            break;
        
        case 'spacer':
            newGuiObject = utils.dom.makeElement('div', folder, 'Spacer', {
                width: '100%',
                height: '20px'
            });
            break;
        
        default:
            console.log('No menu support for ' + guiObject);
            break;
    }
    
    return newGuiObject;
}

Menu.prototype.addInputButton = function(guiObject, folder, label, file, initialValue) {
    var toCheck = (initialValue) ? 'checked' : '';
    var width = (guiObject === 'radio') ? '85%' : '28%';//'45%';
    
    var b = utils.dom.makeElement('input', folder, 'Checkbox', this.buttonCSS);
    b.setAttribute('id', guiObject + 'ButtonFor' + label + file + this.widget.id);
    b.setAttribute('type', guiObject);
    b.setAttribute('name', guiObject + 'Button' + this.widget.id);
    b.checked = toCheck;
    
    var l = utils.dom.makeElement('label', folder, 'Label', utils.dom.mergeArgs(this.labelCSS, {'width': width,}));
    if (label && label.split('/')[1])
        l.innerHTML = label.slice(label.lastIndexOf('/') + 1, label.length);
    else
        l.innerHTML = label;
    l.setAttribute('for', guiObject + 'ButtonFor' + label + file + this.widget.id);
    
    return b;
}

Menu.prototype.addSlider = function(folder, label, values) {
    // must set tab pane visibility to 'block' in order for sliders to init properly
    this.widget.parentElement.style.display = 'block';
    
    var lb = values[0];
    var ub = values[1];
    var step = values[2];
    var init = values[3];
    
    var s = new goog.ui.Slider;
    utils.dom.makeElement('div', folder, 'SliderLabel', this.sliderLabelCSS).innerHTML = label;
    s.decorate(utils.dom.makeElement('div', folder, label, this.defaultSliderCSS));
    s.setMinimum(lb);
    s.setMaximum(ub);
    s.setStep(step);
    s.setValue(init);
    
    return s;
}

Menu.prototype.addTTSlider = function(folder, label, values) {
    var lb = values[0];
    var ub = values[1];
    var initlb = values[2];
    var initub = values[3];
    
    var s = new goog.ui.TwoThumbSlider;
    utils.dom.makeElement('div', folder, 'SliderLabel', this.sliderLabelCSS).innerHTML = label;
    s.decorate(utils.dom.makeElement('div', folder, 'Threshold', this.defaultSliderCSS));
    s.setMinimum(lb);
    s.setMaximum(ub);
    s.setStep(1);
    s.setValueAndExtent(initlb, initub - initlb);
    
    return s;
}
