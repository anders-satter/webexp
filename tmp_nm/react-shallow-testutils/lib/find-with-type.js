'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findWithType;

var _findAllWithType = require('./find-all-with-type');

var _findAllWithType2 = _interopRequireDefault(_findAllWithType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find only one element in the tree with a `type` prop that matches `type`.
 *
 * This is like both React's `findRenderedDOMComponentWithTag` and
 * `findRenderedComponentWithType` as you can supply a component class or a
 * DOM tag.
 *
 * @param  {ReactElement} tree    the rendered tree to traverse
 * @param  {Function|String} type the component type or tag to find
 * @return {ReactElement}         the matching element
 */
function findWithType(root, type) {
  var found = (0, _findAllWithType2.default)(root, type);

  if (found.length !== 1) {
    throw new Error('Did not find exactly one match for type: ' + type);
  }

  return found[0];
}