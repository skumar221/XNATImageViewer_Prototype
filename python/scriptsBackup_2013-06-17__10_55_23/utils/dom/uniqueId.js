// source: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

function __s4__() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};


utils.dom.uniqueId = function () {
  return __s4__() + __s4__() + '-' + __s4__() + '-' + __s4__() + '-' +
         __s4__() + '-' + __s4__() + __s4__() + __s4__();	
}
