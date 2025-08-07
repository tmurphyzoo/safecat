webpackJsonp([6],{

/***/ 398:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;__webpack_require__(57);var _throttle = _interopRequireDefault(__webpack_require__(118));

var _constants = __webpack_require__(100);








var _helpers = __webpack_require__(58);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Filters = /*#__PURE__*/function () {




  function Filters(element) {var _this = this;_classCallCheck(this, Filters);this.activeTab = null;this.previousTab = null;this.outTimeout = null;
    this.element = element;
    this.parent = element.parentNode;
    this.parentBounds = element.getBoundingClientRect();
    this.tabs = _toConsumableArray(element.querySelectorAll(_constants.FILTERS_ITEM_SELECTOR));
    this.underline = element.querySelector(_constants.FILTERS_UNDERLINE_SELECTOR);

    // Bind event listeners to each tab pane so we can trigger additonal functionality
    // when the user switches between each of them.
    this.bindTabPaneEventListeners();

    // Bind the `Tab` functionality to the parent
    this.setActiveTab();

    // Setup the tab for use
    this.tabs.forEach(function (tab) {return _this.setupTab(tab);});

    // Set the position for the underline
    this.setUnderlinePosition(this.activeTab);

    // Store the current underline styles away for later
    this.storeUnderlineStyles();

    // Listen for when the page is resized
    window.addEventListener('resize', (0, _throttle.default)(function () {
      _this.adjustUnderlinePosition();
    }, 100));
  }_createClass(Filters, [{ key: "bindTabPaneEventListeners", value: function bindTabPaneEventListeners()

    {
      var panes = _toConsumableArray(this.parent.querySelectorAll(".tab-pane"));

      panes.forEach(function (pane) {
        pane.addEventListener((0, _helpers.whichEvent)(), function (e) {
          // Refresh the masonry grid
          var grid = pane.querySelector(_constants.GRID_SELECTOR);

          if (grid) {
            grid.dispatchEvent(_constants.EVENTS.GRID_LAYOUT);
          }
        });
      });
    } }, { key: "setActiveTab", value: function setActiveTab()

    {var activeTab = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.previousTab = this.activeTab;
      this.activeTab = activeTab || this.tabs[0];
    } }, { key: "setupTab", value: function setupTab(

    tab) {
      // First, increase the width of the tab by 10 pixels so they have enough room for
      // their hover states which change in font weight.
      var tabBounds = tab.getBoundingClientRect();
      tab.style.width = "".concat(tabBounds.width + 10, "px");

      // Now bind the events...
      this.bindTabEventListeners(tab);
    } }, { key: "bindTabEventListeners", value: function bindTabEventListeners(

    tab) {var _this2 = this;
      tab.addEventListener('click', function (e) {
        e.preventDefault();

        // Set the underline styles for the tab
        _this2.storeUnderlineStyles();

        // Set the active tab
        _this2.setActiveTab(tab);
      });

      tab.addEventListener('mouseenter', function (e) {
        clearTimeout(_this2.outTimeout);
        _this2.setUnderlinePosition(tab);
      });

      tab.addEventListener('mouseleave', function (e) {
        var underline = _this2.underline;

        // After 300 milliseconds, restore the underline back to it's original colour and position
        _this2.outTimeout = setTimeout(function () {
          underline.style.backgroundColor = underline.originalStyles.backgroundColor;
          underline.style.left = underline.originalStyles.left;
          underline.style.width = underline.originalStyles.width;
        }, 300);
      });
    } }, { key: "setUnderlinePosition", value: function setUnderlinePosition(

    tab) {
      var tabBounds = tab.getBoundingClientRect();
      var tabIcon = tab.querySelector(_constants.FILTERS_ICON_SELECTOR);
      var tabColour = window.getComputedStyle(tabIcon).color;

      // Update the underline background colour, left offset and width
      var scrollOffset = this.element.scrollLeft;
      var underline = this.underline;

      underline.style.backgroundColor = tabColour;
      underline.style.left = "".concat(scrollOffset + tabBounds.left - this.parentBounds.left, "px");
      underline.style.width = "".concat(tabBounds.width, "px");
    } }, { key: "storeUnderlineStyles", value: function storeUnderlineStyles()

    {
      this.underline.originalStyles = {
        backgroundColor: this.underline.style.backgroundColor,
        left: this.underline.style.left,
        width: this.underline.style.width };

    } }, { key: "adjustUnderlinePosition", value: function adjustUnderlinePosition()

    {
      // Get the new bounding box for the parent
      this.parentBounds = this.element.getBoundingClientRect();

      // Set the new position for the active tab
      this.setUnderlinePosition(this.activeTab);

      // Store the new underline setting
      this.storeUnderlineStyles();
    } }]);return Filters;}();var _default =


Filters;exports.default = _default;

/***/ })

});
//# sourceMappingURL=filters.f6771a0c64e4b826b2e2.js.map