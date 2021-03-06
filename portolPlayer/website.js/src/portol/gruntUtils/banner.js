/* jshint ignore:start */
window.portol = (function () {
	//'use strict'
	var pgStyleUtils = new StyleUtils();
	var portol_svgns = "http://www.w3.org/2000/svg";
	var portol_xlinkns = "http://www.w3.org/1999/xlink";
	
	/*
	 * Begin Polyfills
	 */
	//@requestAnimationFrame makes function callback on next screen paint.
	window.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
	    window.msRequestAnimationFrame || function(f){setTimeout(f, 1000/60);};
	
	 if (!Element.prototype.addEventListener) {
	   	  var oListeners = {};
	   	  function runListeners(oEvent) {
	   	    if (!oEvent) { oEvent = window.event; }
	   	    for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
	   	      if (oEvtListeners.aEls[iElId] === this) {
	            for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) { oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent); }
	            break;
	          }
	        }
	      }
	      Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
	        if (oListeners.hasOwnProperty(sEventType)) {
	          var oEvtListeners = oListeners[sEventType];
	          for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
	            if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
	          }
	          if (nElIdx === -1) {
	            oEvtListeners.aEls.push(this);
	            oEvtListeners.aEvts.push([fListener]);
	            this["on" + sEventType] = runListeners;
	          } else {
	            var aElListeners = oEvtListeners.aEvts[nElIdx];
	            if (this["on" + sEventType] !== runListeners) {
	              aElListeners.splice(0);
	              this["on" + sEventType] = runListeners;
	            }
	            for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
	              if (aElListeners[iLstId] === fListener) { return; }
	            }     
	            aElListeners.push(fListener);
	          }
	        } else {
	          oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
	          this["on" + sEventType] = runListeners;
	        }
	      };
	      Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
	        if (!oListeners.hasOwnProperty(sEventType)) { return; }
	        var oEvtListeners = oListeners[sEventType];
	        for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
	          if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
	        }
	        if (nElIdx === -1) { return; }
	        for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
	          if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }
	        }
	   	  };
	   }

	 /*
	  * Functions to enable or disable user scrolling.
	  * 	-typically used during scrolling animations.
	  */
	  function preventDefault(){
	  }
	  function preventDefaultForScrollKeys(){
	  }	
	  function disableScroll(){
	  }
	  function enableScroll(){
	  }
	  /*
	 var keys = {37: 1, 38: 1, 39: 1, 40: 1};

	 function preventDefault(e) {
	   e = e || window.event;
	   if (e.preventDefault)
	       e.preventDefault();
	   e.returnValue = false;  
	 }

	 function preventDefaultForScrollKeys(e) {
	     if (keys[e.keyCode]) {
	         preventDefault(e);
	         return false;
	     }
	 }

	 function disableScroll() {
	   if (window.addEventListener) // older FF
	       window.addEventListener('DOMMouseScroll', preventDefault, false);
	   window.onwheel = preventDefault; // modern standard
	   window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	   window.ontouchmove  = preventDefault; // mobile
	   document.onkeydown  = preventDefaultForScrollKeys;
	 }

	 function enableScroll() {
	     if (window.removeEventListener)
	         window.removeEventListener('DOMMouseScroll', preventDefault, false);
	     window.onmousewheel = document.onmousewheel = null; 
	     window.onwheel = null; 
	     window.ontouchmove = null;  
	     document.onkeydown = null;  
	 }
	 */
	//Polyfill for accessing object fields using their keys
	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	 if (!Object.keys) {
	   Object.keys = (function() {
	     'use strict';
	     var hasOwnProperty = Object.prototype.hasOwnProperty,
	         hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
	         dontEnums = [
	           'toString',
	           'toLocaleString',
	           'valueOf',
	           'hasOwnProperty',
	           'isPrototypeOf',
	           'propertyIsEnumerable',
	           'constructor'
	         ],
	         dontEnumsLength = dontEnums.length;

	     return function(obj) {
	       if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
	         throw new TypeError('Object.keys called on non-object');
	       }

	       var result = [], prop, i;

	       for (prop in obj) {
	         if (hasOwnProperty.call(obj, prop)) {
	           result.push(prop);
	         }
	       }

	       if (hasDontEnumBug) {
	         for (i = 0; i < dontEnumsLength; i++) {
	           if (hasOwnProperty.call(obj, dontEnums[i])) {
	             result.push(dontEnums[i]);
	           }
	         }
	       }
	       return result;
	     };
	   }());
	 }
	 
	
/* jshint ignore:end */