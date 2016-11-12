'use strict';

export const ParseStartTag = (s,cb) => {

	if(s.substring(0,1) !== '<') return;
	if(s.substring(0,2) == '</') return;

	const startTagExp = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;

	if(startTagExp.test(s)) {
		let l = RegExp.leftContext,
			c = RegExp.lastMatch,
			r = RegExp.rightContext,
			name = RegExp.$1;

		let attrReg = /[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))/img,
			tag = [],
			result = c.match(attrReg);

		if(result && result.length) {
			for(let i = 0; i < result.length; i++) {
				if(!result[i]) continue;
				let item = result[i].split('=');
				let temp = {};
				temp[item[0]] = item[1].replace(/^['"]/,'').replace(/["']$/,'');
				tag.push(temp)	
			}
		}

		cb && cb({
			name : name,
			attr : tag,
			closeSelf : /\/>$/.test(c),
			status : 'start',
			children : []
		},r)
	}
}

export const ParseEndTag = (s,cb) => {

	if(s.substring(0,2) !== '</') return;

	const endTagExp = /\<\/(\w+)\>/;

	if(endTagExp.test(s)) {
		let l = RegExp.leftContext,
			c = RegExp.lastMatch,
			r = RegExp.rightContext,
			name = RegExp.$1;
		cb && cb({
			name : name,
			status : 'end'
		},r)		
	}

}

export const ParseString = (s,cb) => {

	const index = s.indexOf('<');
	const result = s.substring(0,index);
	const content = s.substring(index);

	cb && cb({
		content : result
	},content)

}