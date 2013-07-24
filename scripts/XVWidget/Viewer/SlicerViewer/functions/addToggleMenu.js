
goog.require('goog.ui.Zippy');
goog.require('goog.ui.AnimatedZippy');
goog.require('goog.fx.Dragger');

var menuContent;
var voluContent;
var meshContent;
var fibrContent;

SlicerViewer.prototype.addToggleMenu = function() {
    
    var that = this;
    
    var folderContentCSS = {
        position: 'absolute',
        color: '#000',
        background: '#fff',
        opacity: '0.35',
        fontSize: XVGlobals.fontSizeSmall,
        fontFamily: XVGlobals.fontFamily,
        width: '24%',
        height: '86%',
        top: '7%',
        border: '1px solid #888',
    }
    
    //----------------------------------
    // volumes
    //----------------------------------
    voluContent = utils.dom.makeElement('div',
                                        that.ScanTabs.getTab('Menu'),
                                        "InnerDiv",
                                        utils.dom.mergeArgs(folderContentCSS, {left: '7%'}));
    
    var voluHeader = utils.dom.makeElement('div',
                                        voluContent,
                                        "InnerHeader folder",
                                        {color: '#000', fontSize: XVGlobals.fontSizeMed});
    voluHeader.innerHTML = 'volumes';
    goog.dom.appendChild(voluContent, goog.dom.createDom('span', { 'id': 'marker' }));
    
    
    //----------------------------------
    // meshes
    //----------------------------------
    meshContent = utils.dom.makeElement('div',
                                        that.ScanTabs.getTab('Menu'),
                                        "InnerDiv",
                                        utils.dom.mergeArgs(folderContentCSS, {left: '38%'}));
    
    var meshHeader = utils.dom.makeElement('div',
                                        meshContent,
                                        "InnerHeader folder",
                                        {color: '#000', fontSize: XVGlobals.fontSizeMed});
    meshHeader.innerHTML = 'meshes';
    
    
    
    //----------------------------------
    // fibers
    //----------------------------------
    fibrContent = utils.dom.makeElement('div',
                                        that.ScanTabs.getTab('Menu'),
                                        "InnerDiv",
                                        utils.dom.mergeArgs(folderContentCSS, {left: '69%'}));
    
    var fibrHeader = utils.dom.makeElement('div',
                                        fibrContent,
                                        "InnerHeader folder",
                                        {color: '#000', fontSize: XVGlobals.fontSizeMed});
    fibrHeader.innerHTML = 'fibers';
}
