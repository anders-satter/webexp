'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findWithRef;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _findAll = require('./find-all');

var _findAll2 = _interopRequireDefault(_findAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Finds an element in the tree with a ref that matches `ref`.
 *
 * @param  {ReactElement} tree    the rendered tree to traverse
 * @param  {String}               ref to find
 * @return {ReactElement}         the found element
 */
function findWithRef(tree, ref) {
  var found = (0, _findAll2.default)(tree, function (component) {
    if (_react2.default.isValidElement(component)) {
      return component.ref != null && component.ref === ref;
    }

    return false;
  });

  if (found.length !== 1) {
    throw new Error('Did not find exactly one match for ref: ' + ref);
  }

  return found[0];
}