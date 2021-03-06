'use strict';

exports.__esModule = true;
exports.default = canUnquote;

var _unquote = require('./unquote');

var _unquote2 = _interopRequireDefault(_unquote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Can unquote attribute detection from mothereff.in
 * Copyright Mathias Bynens <https://mathiasbynens.be/>
 * https://github.com/mathiasbynens/mothereff.in
 */
var escapes = /\\([0-9A-Fa-f]{1,6})[ \t\n\f\r]?/g;
var range = /[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/;

function canUnquote(value) {
    value = (0, _unquote2.default)(value);
    if (value === '-') {
        return false;
    }
    if (value) {
        value = value.replace(escapes, 'a').replace(/\\./g, 'a');
        return !(range.test(value) || /^(?:-?\d|--)/.test(value));
    }
    return false;
}
module.exports = exports['default'];