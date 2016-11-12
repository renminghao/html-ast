'use strict';

import {ParseEndTag, ParseStartTag, ParseString} from './parse-tag'

export const Parse = (s)=>{
	
	s = s.replace(/[\n\t]/img,'');
	let ast;
	let stack;
	let temp;
	let parent = [];

	while(s && s.length > 0){

		ParseEndTag(s, (tag,str)=>{
			let center = parent.pop()
			let tempParent = parent.pop();

			if(tempParent && tempParent.children) {
				
				stack = tempParent.children;
				parent.push(tempParent)

			}else{
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
				ast = tag;
				stack = ast.children;
				parent.push(ast)
			}else{
				temp = tag.children;
				stack.push(tag);
				if(!tag.closeSelf){
					stack = temp;
					parent.push(tag);
				}
			}
			s = str;
		});
		ParseString(s, (tag,str)=>{
			tag.content = tag.content.replace(/^ */,'');
			tag.content.length && temp.push(tag);
			s = str;
		})

	}

	return ast;
}
