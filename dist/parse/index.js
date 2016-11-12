'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Parse = undefined;

var _parseTag = require('./parse-tag');

var Parse = exports.Parse = function Parse(s) {

	s = s.replace(/[\n\t]/img, '');
	var ast = void 0;
	var stack = void 0;
	var temp = void 0;
	var parent = [];

	while (s && s.length > 0) {

		(0, _parseTag.ParseEndTag)(s, function (tag, str) {
			var center = parent.pop();
			var tempParent = parent.pop();

			if (tempParent && tempParent.children) {

				stack = tempParent.children;
				parent.push(tempParent);
			} else {
				if (center) {
					stack = center.children;
				} else {
					stack = ast.children;
				}
			}

			s = str;
		});

		(0, _parseTag.ParseStartTag)(s, function (tag, str) {
			if (!ast) {
				ast = tag;
				stack = ast.children;
				parent.push(ast);
			} else {
				temp = tag.children;
				stack.push(tag);
				if (!tag.closeSelf) {
					stack = temp;
					parent.push(tag);
				}
			}
			s = str;
		});
		(0, _parseTag.ParseString)(s, function (tag, str) {
			tag.content = tag.content.replace(/^ */, '');
			tag.content.length && temp.push(tag);
			s = str;
		});
	}

	return ast;
};