webpackJsonp([4],{

/***/ 396:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;__webpack_require__(57);__webpack_require__(61);__webpack_require__(119);var _constants = __webpack_require__(100);






var _helpers = __webpack_require__(58);function _toConsumableArray(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;} else {return Array.from(arr);}}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Form = /*#__PURE__*/function () {



  /**
                                  * Binds some simple logic to the form.
                                  *
                                  * @param {Element} form The form element
                                  */
  function Form(form) {_classCallCheck(this, Form);this.currentAction = 0;this.submitActions = [];
    this.form = form;
    this.fields = _toConsumableArray(this.form.querySelectorAll(_constants.INPUT_FIELDS));

    // Parse the `data-submit-action` attribute if it exists
    var submitActions = form.getAttribute('data-submit-actions');

    if (submitActions) {
      this.submitActions = (0, _helpers.parseJSON)(submitActions);
    }

    // Create a new error container for the form
    this.createErrorContainer();

    // Bind the event listeners
    this.bindFormEventListeners();

    // Bind specific listeners to form fields that require one or more
    this.bindFormFieldEventListeners();
  }_createClass(Form, [{ key: "createErrorContainer", value: function createErrorContainer()





    {
      var errorContainer = this.errorContainer = document.createElement('div');
      var errorInside = this.form.getAttribute('data-error-inside') === 'true';

      errorContainer.classList.add(_constants.FORM_ERROR_MESSAGE_CLASS);
      errorContainer.style.maxWidth = window.getComputedStyle(this.form).width;

      if (errorInside) {
        this.form.insertBefore(errorContainer, this.form.firstChild);
      } else {
        this.form.parentNode.insertBefore(errorContainer, this.form);
      }
    } }, { key: "bindFormEventListeners", value: function bindFormEventListeners()

    {var _this = this;
      this.form.addEventListener(_constants.EVENTS.FORM_SUBMIT.type, function (e) {
        _this.runSubmitActions();
      });

      this.form.addEventListener('form.error', function (e) {
        _this.errorMessage = 'Please complete all required fields';
      });
    } }, { key: "bindFormFieldEventListeners", value: function bindFormFieldEventListeners()

    {var _this2 = this;
      this.fields.forEach(function (field) {
        if (field.type === 'file') {
          _this2.bindFileUploadEventListener(field);
        }
      });
    }

    /**
       * Binds a change event to the file input field.
       *
       * @param {Element} field The form field
       */ }, { key: "bindFileUploadEventListener", value: function bindFileUploadEventListener(
    field) {
      var listClass = "".concat(field.parentNode.className, "-list");

      // Create a list container to store the selected files in
      var fileList = document.createElement('div');
      fileList.classList.add(listClass);

      field.insertAdjacentElement('afterend', fileList);

      // Bind the change event
      field.addEventListener('change', function (e) {
        fileList.innerHTML = '';

        // Create the list
        var files = e.target.files;

        for (var file in files) {
          if (files.hasOwnProperty(file)) {
            file = files[file];

            // Create a new element for the file
            var listItem = document.createElement('div');
            listItem.classList.add("".concat(listClass, "-item"));
            listItem.innerHTML = escape(file.name);

            // Append the list item
            fileList.appendChild(listItem);
          }
        }
      });
    } }, { key: "runSubmitActions", value: function runSubmitActions()

    {var _this3 = this;
      var submitActions = this.submitActions;

      var promise = new Promise(function (resolve, reject) {
        // Construct a promise chain that acts similarly to `Promise.all` but in a synchronous
        // way that ensures they all run in order.
        if (submitActions.length > 1) {
          _this3.setupNextAction(resolve, reject);

          // Run the only defined action then resolve the promise
        } else if (submitActions.length === 1) {
          _this3.runSubmitAction(submitActions[0]).then(resolve);

          // Resolve the promise straight away as we have no actions
        } else {
          resolve();
        }
      });

      // Reset the form
      promise.
      then(function () {return _this3.resetForm();}).
      catch(function (err) {
        console.error('Form.runSubmitActions:', err);

        _this3.currentAction = 0;
        _this3.errorMessage = err;
      });
    } }, { key: "setupNextAction", value: function setupNextAction(

    resolve, reject) {var _this4 = this;
      var actions = this.submitActions;
      var nextAction = this.runSubmitAction(actions[this.currentAction]);

      nextAction.
      then(function () {
        if (_this4.currentAction === actions.length - 1) {
          resolve();
        } else {
          ++_this4.currentAction;
          _this4.setupNextAction(resolve, reject);
        }
      }).
      catch(reject);
    } }, { key: "runSubmitAction", value: function runSubmitAction(

    action) {var _this5 = this;
      var form = this.form;
      return new Promise(function (resolve, reject) {
        switch (action.type) {
          case 'submit':
            form.submit();
            break;

          case 'xhr':
            console.log(_this5.getFieldValues());
            // reject('XHR not yet implemented!')
            break;

          case 'modal':
            __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 60)).
            then(function (MicroModal) {
              var openModals = document.querySelectorAll('.modal.is-open');

              if (openModals.length) {
                MicroModal.close();
              }

              // Open the new modal
              MicroModal.show(action.id, _constants.MODAL_OPTIONS);
            }).
            catch(console.error);
            break;

          default:
          // No type set therefore we don't need to do anything
        }

        resolve();
      });
    }

    /**
       * Resets the form back to its original state before any user interaction.
       */ }, { key: "resetForm", value: function resetForm()
    {
      this.form.reset();

      // Clear any file lists
      this.fields.forEach(function (field) {
        if (field.type === 'file') {
          field.nextSibling.innerHTML = '';
        }
      });

      // Reset the action counter
      this.currentAction = 0;

      // Clear any of the validation classes and reset the ARIA attributes
      if (this.form.validation) {
        this.form.validation.resetValidation();
      }
    } }, { key: "getFieldValues", value: function getFieldValues()

    {
      var fields = {};

      this.fields.forEach(function (field) {
        if (field.type === 'file') {
          var files = field.files;
          fields[field.name] = [];

          for (var file in files) {
            if (files.hasOwnProperty(file)) {
              fields[field.name].push(files[file]);
            }
          }
        } else {
          fields[field.name] = field.value;
        }
      });

      return fields;
    } }, { key: "errorMessage", set: function set(message) {this.errorContainer.innerHTML = message;} }]);return Form;}();var _default =


Form;exports.default = _default;

/***/ })

});
//# sourceMappingURL=form.3f64f519fffecf1f9657.js.map