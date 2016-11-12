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
			//如果有子节点，当前节点不需要做任何操作
			result.end && end.push(result.end);
		} else {
			//如果是叶子节点
			result.end && end.push(result.end);

			var nodeEmpt = result.start.replace(/ */img, '') == '';
			//如果是子元素列表的最后一个元素
			if (!result.siblings) {
				//如果start内容有值
				//<s></s>这种情况
				if (nodeEmpt) {

					var temp = end.pop();
					start.push(temp);
				} else {
					//如果没值需要将end中的最后两个填充
					var _temp = end.splice(end.length - 2);
					start = start.concat(_temp.reverse());
				}
			}
			if (result.closeSelf) {
				//如果是自闭和函数只需要pop一个
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
	//深度优先遍历所有节点
	cb(o, siblings, 1);
	var t = o['children'];
	//标记当前节点是不是子节点的最后一个
	//如果是最后一个需要返回上一个tag的结束标签
	var child = t && t.length - 1 || 0;
	t && t.map(function (item, index) {
		deepMap(item, cb, child--);
	});
};