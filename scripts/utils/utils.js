goog.provide('utils');


goog.require('goog.ui.Slider');
goog.require('goog.ui.ProgressBar');
goog.require('goog.ui.Component');

goog.require('goog.array');
goog.require('goog.dom'); 
goog.require('goog.style'); 

goog.require('goog.events.MouseWheelHandler');
goog.require('goog.fx');
goog.require('goog.fx.DragDrop');
goog.require('goog.fx.DragDropGroup');







/**
 * @constructor
 */
utils = function() {};



goog.provide('utils.ajax');
/**
 * @constructor
 */
utils.ajax = function () {};


goog.provide('utils.convert');
/**
 * @constructor
 */
utils.convert = function () {};


goog.provide('utils.css');
/**
 * @constructor
 */
utils.css = function () {};


goog.provide('utils.dom');
/**
 * @constructor
 */
utils.dom = function () {};



goog.provide('utils.gui');
/**
 * @constructor
 */
utils.gui = function () {};


goog.provide('utils.oo');
/**
 * @constructor
 */
utils.oo = function () {};


goog.provide('utils.fx');
/**
 * @constructor
 */
utils.fx = function () {};



goog.provide('utils.array');
/**
 * @constructor
 */
utils.array = function () {};



goog.provide("utils.globals");

utils.globals = function(){

}


goog.exportSymbol("utils.globals", utils.globals);

utils.globals.fontSizeS = /** @const */ 10;
utils.globals.fontSizeM = /** @const */ 13;
utils.globals.fontSizeL = /** @const */ 16;
utils.globals.fontFamily = /** @const */ 'Helvetica, Helvetica neue, Arial, sans-serif';


//---------------------------
//  ANIMATION LENGTHS
//---------------------------

utils.globals.animFast = /** @const */ 200;
utils.globals.animMedium = /** @const */ 500;
utils.globals.animSlow = /** @const */ 100;	
