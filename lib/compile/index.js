import {compileTag} from './compile-tag'
import _ from 'lodash';

export const Compile = s => {

	let start = [];
	let end = [];

	s = isObj(s) ? s : JSON.parse(s);

	deepMap(s, (item,siblings) => {
		
		let result = compileTag(item,siblings);
		result && 
		result.start && 
		start.push(result.start);

		result && 
		result.content && 
		start.push(result.content);
		
		if(result && result.hasChild){

			result.end && 
			end.push(result.end);

		}else{

			result.end && 
			end.push(result.end)

			let tagStart = result.start.replace(/ */img,'') == '';

			if(!result.siblings){

				if(tagStart){

				let temp = end.pop();
				start.push(temp)

				}else{

					let temp = end.splice(end.length - 2);
					start = start.concat(temp.reverse());

				}
			}
			if(result.closeSelf){

				let temp = end.pop();
				start.push(temp)

			}
		}

		start = _.remove(start, undefined);
		end = _.remove(end, undefined);
		
	},false)

	return start.join('') + end.reverse().join('');
}

const isObj = s => {
	return Object.prototype.toString.call(s) === '[object Object]';
}

const deepMap = (o,cb,siblings) => {
	cb(o,siblings,1)
	let t = o['children'];
	let child = t && t.length - 1 || 0;
	t && t.map((item, index)=>{
		deepMap(item,cb,child--);
	})
}