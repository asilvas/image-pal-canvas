/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var img = document.getElementById('img');
var uploadBtn = document.getElementById('uploadBtn');
var rgbColors = document.getElementById('rgbColors');
var hsluvColors = document.getElementById('hsluvColors');

var options = {
  width: document.getElementById('width'),
  height: document.getElementById('height'),
  maxColors: document.getElementById('maxColors'),
  minDensity: document.getElementById('minDensity'),
  //maxDensity: document.getElementById('maxDensity'),
  cubicCells: document.getElementById('cubicCells'),
  mean: document.getElementById('mean'),
  order: document.getElementById('order')
};

var applyBtn = document.getElementById('apply');

var rgbInstance = void 0,
    hsluvInstance = void 0;

function apply() {
  if (rgbInstance) rgbInstance.unregister();
  if (hsluvInstance) hsluvInstance.unregister();

  var startTime = Date.now();

  var opts = {
    onProcess: function onProcess() {
      startTime = Date.now();
    },
    imageEl: img,
    inputEl: uploadBtn,
    width: options.width.value ? parseInt(options.width.value) : false,
    height: options.height.value ? parseInt(options.height.value) : false,
    maxColors: options.maxColors.value ? parseInt(options.maxColors.value) : false,
    minDensity: options.minDensity.value ? parseFloat(options.minDensity.value) : false,
    //maxDensity: options.maxDensity.value ? parseFloat(options.maxDensity.value) : false, 
    cubicCells: options.cubicCells.value ? parseInt(options.cubicCells.value) : false,
    mean: options.mean.checked,
    order: options.order.value
  };

  if (options.width.value) {
    img.style.width = parseInt(options.width.value) + 'px';
    img.style.height = '';
  } else {
    img.style.height = parseInt(options.height.value) + 'px';
    img.style.width = '';
  }

  rgbInstance = imagePalCanvasRgb(opts, function (err, colors) {
    if (err) return void console.error('oops!', err.stack || err);

    var elapsed = Date.now() - startTime;

    displayColors(rgbColors, colors, elapsed);
  });

  hsluvInstance = imagePalCanvasHsluv(opts, function (err, colors) {
    if (err) return void console.error('oops!', err.stack || err);

    var elapsed = Date.now() - startTime;

    displayColors(hsluvColors, colors, elapsed);
  });
}

apply();

applyBtn.addEventListener('click', apply);

function displayColors(el, colors, elapsed) {
  var html = '<h5>' + elapsed + 'ms / ' + (1000 / elapsed).toFixed(2) + 'fps</h5>';
  colors.forEach(function (c) {
    html += '<div class="color" style="background-color:' + c.hex + '">' + c.hex + '<br />' + (c.density * 100).toString().substr(0, 5) + '%</div>';
  });
  el.innerHTML = html;
}

/***/ })
/******/ ]);
//# sourceMappingURL=index.es5.js.map