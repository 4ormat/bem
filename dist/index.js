"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bem = undefined;

var _isObject = require("lodash/isObject");

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = require("lodash/isArray");

var _isArray2 = _interopRequireDefault(_isArray);

var _identity = require("lodash/identity");

var _identity2 = _interopRequireDefault(_identity);

var _keys = require("lodash/keys");

var _keys2 = _interopRequireDefault(_keys);

var _pickBy = require("lodash/pickBy");

var _pickBy2 = _interopRequireDefault(_pickBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bem = function bem(blockName, elementName, modifierName) {
  var _addElement = function _addElement(element) {
    return bem(blockName, element, modifierName);
  };
  var _addModifier = function _addModifier(modifier) {
    return bem(blockName, elementName, modifier);
  };
  return {
    toString: function toString() {
      var classes = "" + blockName + (elementName ? "__" + elementName : "");

      if (!modifierName) return classes;

      var modifierObject = (0, _isObject2.default)(modifierName) ? modifierName : _defineProperty({}, modifierName, true);

      var modifierArray = (0, _isArray2.default)(modifierObject) ? modifierObject : (0, _keys2.default)((0, _pickBy2.default)(modifierObject, function (key) {
        return !!key;
      }));

      if (!modifierArray.length) return classes;

      var modifierStrings = modifierArray.filter(_identity2.default);
      return classes + " " + modifierStrings.map(function (modifier) {
        return classes + "--" + modifier;
      }).join(" ");
    },
    toSelector: function toSelector() {
      return this.toString().split(" ").map(function (className) {
        return "." + className;
      }).join("");
    },
    element: _addElement,
    e: _addElement,
    modifier: _addModifier,
    m: _addModifier
  };
};

exports.bem = bem;
exports.default = bem;