import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import identity from "lodash/identity";
import keys from "lodash/keys";
import pickBy from "lodash/pickBy";

export const bem = (blockName, elementName, modifierName) => {
  const _addElement = element => bem(blockName, element, modifierName);
  const _addModifier = modifier => bem(blockName, elementName, modifier);
  return {
    toString: function() {
      const classes = `${blockName}${elementName ? "__" + elementName : ""}`;

      if (!modifierName) return classes;

      const modifierObject = isObject(modifierName) ? modifierName : { [modifierName]: true };

      const modifierArray = isArray(modifierObject) ? modifierObject : keys(pickBy(modifierObject, key => !!key));

      if (!modifierArray.length) return classes;

      const modifierStrings = modifierArray.filter(identity);
      return classes + " " + modifierStrings.map(modifier => `${classes}--${modifier}`).join(" ");
    },
    toSelector: function() {
      return this.toString()
        .split(" ")
        .map(className => `.${className}`)
        .join("");
    },
    element: _addElement,
    e: _addElement,
    modifier: _addModifier,
    m: _addModifier
  };
};
