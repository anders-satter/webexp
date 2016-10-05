'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDOMComponent;
/**
 * Returns whether an element is a DOM element.
 *
 * @param  {ReactElement}     element
 * @return {Boolean}          whether the element is a DOM element
 */
function isDOMComponent(element) {
  return typeof element.type === 'string';
}