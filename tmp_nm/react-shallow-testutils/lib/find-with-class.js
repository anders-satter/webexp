'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findWithClass;

var _findAllWithClass = require('./find-all-with-class');

var _findAllWithClass2 = _interopRequireDefault(_findAllWithClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find only one element in the tree with a `className` prop that matches
 * `className`.
 *
 * This is different to React's `findRenderedDOMComponentWithClass` in that
 * it will check *all* components and not just DOM components.
 *
 * @param  {ReactElement} tree  the rendered tree to traverse
 * @param  {String} className   the class to find
 * @return {ReactElement}       the matching element
 */
function findWithClass(root, className) {
  var found = (0, _findAllWithClass2.default)(root, className);

  if (found.length !== 1) {
    throw new Error('Did not find exactly one match for class: ' + className);
  }

  return found[0];
}