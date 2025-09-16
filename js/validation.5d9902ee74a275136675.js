webpackJsonp([3],{

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;__webpack_require__(57);__webpack_require__(14);var _constants = __webpack_require__(100);function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Validation = /*#__PURE__*/function () {
  /**
                                        * Binds validation to the form.
                                        *
                                        * @param {Element} form The form element
                                        */
  function Validation(form) {_classCallCheck(this, Validation);
    this.form = form;
    this.fields = _toConsumableArray(this.form.querySelectorAll(_constants.INPUT_FIELDS));

    // Filter out any fields that aren't required
    this.fields = this.fields.filter(function (field) {return field.required;});

    // Bind the submit event
    this.bindFormSubmitEvent();

    // Attach the validation method to the fields
    this.attachFieldValidation();
  }

  /**
     * Binds a submit event to the form element to validate the form.
     */_createClass(Validation, [{ key: "bindFormSubmitEvent", value: function bindFormSubmitEvent()
    {var _this = this;
      this.form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (_this.validateFields()) {
          _this.form.dispatchEvent(_constants.EVENTS.FORM_SUBMIT);
        }
      });
    }

    /**
       * Attaches a `valid` method to each field and binds events to them.
       */ }, { key: "attachFieldValidation", value: function attachFieldValidation()
    {var _this2 = this;
      this.fields.forEach(function (field) {
        field.valid = _this2.validateField.bind(_this2, field);

        // Bind a couple of events to the field
        _this2.bindFieldEvents(field);
      });
    }

    /**
       * Binds the correct event(s) to the field so it can be validated in real time.
       *
       * @param {Element} field The form field
       */ }, { key: "bindFieldEvents", value: function bindFieldEvents(
    field) {var _this3 = this;
      var events = ['input', 'blur'];

      if (/checkbox|radio/.test(field.type) || field.nodeName.toLowerCase() === 'select') {
        events = ['change'];
      }

      for (var event in events) {
        field.addEventListener(events[event], function () {return _this3.setFieldStatus(field);});
      }
    }

    /**
       * Applies the correct styles and ARIA state to the form field.
       *
       * @param  {Element} field The form field
       * @return {Boolean}
       */ }, { key: "setFieldStatus", value: function setFieldStatus(
    field) {
      var valid = field.valid();

      // Add or remove the invalid class
      field.classList[!valid ? 'add' : 'remove'](_constants.INVALID_CLASS);

      // Set the ARIA status
      field.setAttribute('aria-invalid', !valid);

      // Set the parent class
      var parent = field.parentNode;

      while (parent) {
        if (parent.classList.contains('form__field')) {
          parent.classList[!valid ? 'add' : 'remove']('form__field--invalid');
          parent = null;
        } else {
          parent = parent.parentNode;
        }
      }

      return valid;
    }

    /**
       * Validates all the fields in the form that were found earlier.
       *
       * @return {Boolean}
       */ }, { key: "validateFields", value: function validateFields()
    {var _this4 = this;
      var invalid = this.fields.filter(function (field) {return !_this4.setFieldStatus(field);});

      // Focus on the first invalid field
      if (invalid.length) {
        invalid[0].focus();
      }

      return !invalid.length;
    }

    /**
       * Validates the field against pre-defined patterns to ensure it is valid.
       *
       * @param  {Element} field The form field
       * @return {Boolean}
       */ }, { key: "validateField", value: function validateField(
    field) {
      var valid = true;

      if (field.type === 'checkbox') {
        valid = field.checked;
      } else {
        var value = field.value;

        // Pattern check
        switch (field.getAttribute('data-pattern') || field.type) {
          case 'email':
            valid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value);
            break;

          default:
            valid = value.length;}


        // Length check
        var maxLength = parseInt(field.getAttribute('data-maxlength'), 10);

        if (!isNaN(maxLength) && value.split(' ').length > maxLength) {
          valid = false;
        }
      }

      return valid;
    }

    /**
       * Clear any of the validation classes and reset the ARIA attributes.
       */ }, { key: "resetValidation", value: function resetValidation()
    {
      this.fields.forEach(function (field) {
        field.classList.remove(_constants.INVALID_CLASS);
        field.setAttribute('aria-invalid', false);
      });
    } }]);return Validation;}();var _default =


Validation;exports.default = _default;

/***/ })

});
//# sourceMappingURL=validation.5d9902ee74a275136675.js.map