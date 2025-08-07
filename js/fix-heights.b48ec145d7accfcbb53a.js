webpackJsonp([5],{

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = FixHeights;__webpack_require__(57);function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function FixHeights() {
  var fixHeights = _toConsumableArray(
  document.querySelectorAll('.zv-featured')).concat(_toConsumableArray(
  document.querySelectorAll('.masonry-grid__item')));


  if (fixHeights.length) {
    fixHeights.forEach(function (element) {
      var styles = window.getComputedStyle(element);

      if (/^-ms-flexbox|flex$/.test(styles.display)) {
        element.style.height = styles.minHeight;
      }
    });
  }
}

/***/ })

});
//# sourceMappingURL=fix-heights.b48ec145d7accfcbb53a.js.map