'use strict';

import {ParseEndTag, ParseStartTag, ParseString} from './parse-tag'

export const Parse = (s)=>{

	s = s.replace(/[\n\t]/img,'');

	let ast;//缓存结果
	let stack;//当前的list列表的标志位
	let temp;//node节点需要
	let parent = [];//父亲节点集合，用来整理父子关系

	while(s && s.length > 0){
		// 必须先匹配结束tag,因为标签的开始and结束都是<，开始标签不具有规律性，结束标签永远为</
		ParseEndTag(s, (tag,str)=>{

			let center = parent.pop()
			let tempParent = parent.pop();
			//叶子节点需要上移两位
			if(tempParent && tempParent.children) {
				//前移标志位
				stack = tempParent.children;
				parent.push(tempParent)

			}else{
				//遇到结束标签层级向上推移
				//如果为根节点就证明是ast
				if(center) {
					stack = center.children;
				}else{
					stack = ast.children;
				}
			}

			s = str;
		})

		ParseStartTag(s, (tag,str)=>{
			if(!ast){
				//创建ast原始节点
				ast = tag;
				//stack永远为当前节点的子节点列表
				stack = ast.children;
				//更新parent
				parent.push(ast)
			}else{
				//新节点永远为上一个节点的子节点
				temp = tag.children;
				stack.push(tag);
				//如果不是自闭和标签就需要更新父节点集合列表
				//子标签:input,br,hr etc.
				if(!tag.closeSelf){
					stack = temp;
					parent.push(tag);
				}
			}
			s = str;
		});

		ParseString(s, (tag,str)=>{
			tag.content = tag.content.replace(/^ */,'');
			//node节点直接更新到当前父节点的子节点列表
			tag.content.length && temp.push(tag);
			s = str;
		})

	}

	return ast;
}
