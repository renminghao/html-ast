'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var ParseStartTag = exports.ParseStartTag = function ParseStartTag(s, cb) {

	if (s.substring(0, 1) !== '<') return;
	if (s.substring(0, 2) == '</') return;

	var startTagExp = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;

	if (startTagExp.test(s)) {
		var l = RegExp.leftContext,
		    c = RegExp.lastMatch,
		    r = RegExp.rightContext,
		    name = RegExp.$1;

		var attrReg = /[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))/img,
		    tag = [],
		    result = c.match(attrReg);

		if (result && result.length) {
			for (var i = 0; i < result.length; i++) {
				if (!result[i]) continue;
				var item = result[i].split('=');
				var temp = {};
				temp[item[0]] = item[1].replace(/^['"]/, '').replace(/["']$/, '');
				tag.push(temp);
			}
		}

		cb && cb({
			name: name,
			attr: tag,
			closeSelf: /\/>$/.test(c),
			status: 'start',
			children: []
		}, r);
	}
};

var ParseEndTag = exports.ParseEndTag = function ParseEndTag(s, cb) {
	//匹配出结束节点
	if (s.substring(0, 2) !== '</') return;

	var endTagExp = /\<\/(\w+)\>/;

	if (endTagExp.test(s)) {
		var l = RegExp.leftContext,
		    c = RegExp.lastMatch,
		    r = RegExp.rightContext,
		    name = RegExp.$1;
		cb && cb({
			name: name,
			status: 'end'
		}, r);
	}
};

var ParseString = exports.ParseString = function ParseString(s, cb) {
	//匹配出node节点
	var index = s.indexOf('<');
	var result = s.substring(0, index);
	var content = s.substring(index);

	cb && cb({
		content: result
	}, content);
};