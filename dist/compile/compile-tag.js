'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
var compileTag = exports.compileTag = function compileTag(s, siblings) {
				//根据节点的内容 返回开始结束标签 and 一些attr

				var attr = ' ';

				var prefix = s.name ? '<' + s.name : '';
				var endfix = s.name ? '>' : '';
				var end = s.name ? '</' + s.name + '>' : undefined;

				var content = s.content ? s.content : undefined;

				s.attr && s.attr.length && s.attr.map(function (item) {
								for (var key in item) {
												attr += key + '=\'' + item[key] + '\' ';
								}
				});

				return {
								start: '' + prefix + attr + endfix,
								content: content,
								end: end,
								hasChild: s.children && s.children.length,
								closeSelf: s.closeSelf,
								siblings: siblings
				};
};