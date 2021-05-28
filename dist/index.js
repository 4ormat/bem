"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.bem = void 0;

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _isArray = _interopRequireDefault(require("lodash/isArray"));

var _identity = _interopRequireDefault(require("lodash/identity"));

var _keys = _interopRequireDefault(require("lodash/keys"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      var classes = "".concat(blockName).concat(elementName ? "__" + elementName : "");
      if (!modifierName) return classes;
      var modifierObject = (0, _isObject["default"])(modifierName) ? modifierName : _defineProperty({}, modifierName, true);
      var modifierArray = (0, _isArray["default"])(modifierObject) ? modifierObject : (0, _keys["default"])((0, _pickBy["default"])(modifierObject, function (key) {
        return !!key;
      }));
      if (!modifierArray.length) return classes;
      var modifierStrings = modifierArray.filter(_identity["default"]);
      return classes + " " + modifierStrings.map(function (modifier) {
        return "".concat(classes, "--").concat(modifier);
      }).join(" ");
    },
    toSelector: function toSelector() {
      return this.toString().split(" ").map(function (className) {
        return ".".concat(className);
      }).join("");
    },
    element: _addElement,
    e: _addElement,
    modifier: _addModifier,
    m: _addModifier
  };
};

exports.bem = bem;
var _default = bem;
exports["default"] = _default;