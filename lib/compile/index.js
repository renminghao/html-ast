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
			//如果有子节点，当前节点不需要做任何操作
			result.end && 
			end.push(result.end);

		}else{
			//如果是叶子节点
			result.end && 
			end.push(result.end)

			let nodeEmpt = result.start.replace(/ */img,'') == '';
			//如果是子元素列表的最后一个元素
			if(!result.siblings){
				//如果start内容有值
				//<s></s>这种情况
				if(nodeEmpt){

					let temp = end.pop();
					start.push(temp)

				}else{
					//如果没值需要将end中的最后两个填充
					let temp = end.splice(end.length - 2);
					start = start.concat(temp.reverse());

				}
			}
			if(result.closeSelf){
				//如果是自闭和函数只需要pop一个
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
	//深度优先遍历所有节点
	cb(o,siblings,1)
	let t = o['children'];
	//标记当前节点是不是子节点的最后一个
	//如果是最后一个需要返回上一个tag的结束标签
	let child = t && t.length - 1 || 0;
	t && t.map((item, index)=>{
		deepMap(item,cb,child--);
	})
}