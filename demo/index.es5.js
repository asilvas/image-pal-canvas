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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/index.js":
/*!***********************!*\
  !*** ./demo/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var rgbInstance, hsluvInstance;

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
  var html = "<h5>".concat(elapsed, "ms / ").concat((1000 / elapsed).toFixed(2), "fps</h5>");
  colors.forEach(function (c) {
    html += "<div class=\"color\" style=\"background-color:".concat(c.hex, "\">").concat(c.hex, "<br />").concat((c.density * 100).toString().substr(0, 5), "%</div>");
  });
  el.innerHTML = html;
}

/***/ })

/******/ });
//# sourceMappingURL=index.es5.js.map