'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findAll;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Traverses the tree and returns all elements that satisfy the function `test`.
 *
 * @param  {ReactElement}   tree the tree to traverse
 * @param  {Function} test  the test for each component
 * @return {Array}          the elements that satisfied `test`
 */
function findAll(tree, test) {
  var found = test(tree) ? [tree] : [];

  if (_react2.default.isValidElement(tree)) {
    if (_react2.default.Children.count(tree.props.children) > 0) {
      _react2.default.Children.forEach(tree.props.children, function (child) {
        found = found.concat(findAll(child, test));
      });
    }
  }

  return found;
}