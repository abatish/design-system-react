'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _inputIcon = require('../../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _utilities = require('../../../utilities');

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*
                                                                                                                                                                                                                             Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                             Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                             Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                             Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                             
                                                                                                                                                                                                                             THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                             */

// # Inline Edit Component

// Implements an inline edit component based on the [Input design pattern](https://www.lightningdesignsystem.com/components/forms/#input) in React.

// ## Dependencies

// ### React


// ### isFunction


// ## Children


// ### Event Helpers


// ## Constants


/**
 * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
 */
var InlineEdit = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.FORMS_INLINE_EDIT,

	// ### Prop Types
	propTypes: {
		/**
   * Class names to be added to the outer container of the input.
   */
		className: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
		/**
   * Name of the submitted form parameter.
   */
		name: _react.PropTypes.string,
		/**
   * Disables the Inline Edit component and prevents editing the contents.
   */
		disabled: _react.PropTypes.bool,
		/**
   * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
   */
		id: _react.PropTypes.string.isRequired,
		/**
   * This event fires when the input changes.
   */
		onChange: _react.PropTypes.func,
		/**
   * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
   */
		type: _react.PropTypes.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
		/**
   * Inline Edit is a controlled component, and will always display this value.
   */
		value: _react.PropTypes.string.isRequired
	},

	getDefaultProps: function getDefaultProps() {
		return {
			type: 'text'
		};
	},
	getInitialState: function getInitialState() {
		return {
			isEditing: false,
			value: null
		};
	},


	// ### Render
	render: function render() {
		var _props = this.props,
		    disabled = _props.disabled,
		    value = _props.value,
		    name = _props.name,
		    rest = _objectWithoutProperties(_props, ['disabled', 'value', 'name']);

		var inlineEditTrigger = _react2.default.createElement(_button2.default, {
			assistiveText: 'Edit',
			disabled: disabled,
			iconName: 'edit',
			iconPosition: 'right',
			iconSize: 'small',
			variant: 'icon'
		});

		return _react2.default.createElement(_index2.default, _extends({}, rest, {
			iconRight: this.state.isEditing ? _react2.default.createElement(_inputIcon2.default, {
				category: 'utility',
				name: 'close',
				position: 'right',
				onClick: this.endEditMode
			}) : null,
			disabled: disabled,
			inlineEditTrigger: inlineEditTrigger,
			onBlur: this.handleBlur,
			onChange: this.handleChange,
			onClick: !this.state.isEditing ? this.triggerEditMode : null,
			onKeyDown: this.handleKeyDown,
			readOnly: !this.state.isEditing,
			name: name,
			value: this.state.isEditing ? this.state.value : value
		}));
	},
	componentDidUpdate: function componentDidUpdate() {
		if (this.autoFocus) {
			var input = _reactDom2.default.findDOMNode(this).getElementsByTagName('input')[0];

			if (input) {
				input.focus();
				input.select();
			}

			this.autoFocus = false;
		}
	},
	triggerEditMode: function triggerEditMode() {
		if (!this.props.disabled) {
			this.autoFocus = true;
			this.setState({
				isEditing: true,
				value: this.props.value
			});
		}
	},
	saveEdits: function saveEdits() {
		if ((0, _lodash2.default)(this.props.onChange)) {
			this.props.onChange({
				value: this.state.value
			});
		}

		this.endEditMode();
	},
	endEditMode: function endEditMode() {
		if (this.willSave) {
			clearTimeout(this.willSave);
			delete this.willSave;
		}

		this.setState({
			isEditing: false,
			value: null
		});
	},
	handleBlur: function handleBlur() {
		if (!this.willSave) {
			this.willSave = setTimeout(this.saveEdits, 200);
		}
	},
	handleChange: function handleChange(event) {
		this.setState({
			value: event.target.value
		});
	},
	handleKeyDown: function handleKeyDown(event) {
		if (event.keyCode) {
			if (event.keyCode === _utilities.KEYS.ESCAPE) {
				this.endEditMode();
			} else if (event.keyCode === _utilities.KEYS.ENTER) {
				this.saveEdits();
			}
		}
	}
});

module.exports = InlineEdit;