'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Compile = undefined;

var _compileTag = require('./compile-tag');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Compile = exports.Compile = function Compile(s) {

	var start = [];
	var end = [];

	s = isObj(s) ? s : JSON.parse(s);

	deepMap(s, function (item, siblings) {

		var result = (0, _compileTag.compileTag)(item, siblings);
		result && result.start && start.push(result.start);

		result && result.content && start.push(result.content);

		if (result && result.hasChild) {

			result.end && end.push(result.end);
		} else {

			result.end && end.push(result.end);

			var tagStart = result.start.replace(/ */img, '') == '';

			if (!result.siblings) {

				if (tagStart) {

					var temp = end.pop();
					start.push(temp);
				} else {

					var _temp = end.splice(end.length - 2);
					start = start.concat(_temp.reverse());
				}
			}
			if (result.closeSelf) {

				var _temp2 = end.pop();
				start.push(_temp2);
			}
		}

		start = _lodash2.default.remove(start, undefined);
		end = _lodash2.default.remove(end, undefined);
	}, false);

	return start.join('') + end.reverse().join('');
};

var isObj = function isObj(s) {
	return Object.prototype.toString.call(s) === '[object Object]';
};

var deepMap = function deepMap(o, cb, siblings) {
	cb(o, siblings, 1);
	var t = o['children'];
	var child = t && t.length - 1 || 0;
	t && t.map(function (item, index) {
		deepMap(item, cb, child--);
	});
};