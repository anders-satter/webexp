'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findAllWithClass;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _findAll = require('./find-all');

var _findAll2 = _interopRequireDefault(_findAll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns true if the given parameter `classNameList` contains the
 * given parameter `className`.
 *
 * @param  {String}  classNameList String of all class names
 * @param  {String}  className     The class name to search for
 * @return {Boolean}
 */
function hasClassName(classNameList, className) {
  return (' ' + classNameList + ' ').indexOf(' ' + className + ' ') !== -1;
}

/**
 * Finds all elements in the tree with a class that matches `className`.
 *
 * This is different to React's `scryRenderedDOMComponentsWithClass` in that
 * it will check *all* components and not just DOM components.
 *
 * @param  {ReactElement} tree  the rendered tree to traverse
 * @param  {String} className   the class to find
 * @return {Array}              all matching elements
 */
function findAllWithClass(tree, className) {
  return (0, _findAll2.default)(tree, function (component) {
    if (_react2.default.isValidElement(component)) {
      if (component.props.className != null) {

        if (className.indexOf('.') !== -1) {
          var classNameList = className.split('.');

          return classNameList.every(function (val) {
            return hasClassName(component.props.className, val);
          });
        }

        return hasClassName(component.props.className, className);
      }

      return false;
    }

    return false;
  });
}