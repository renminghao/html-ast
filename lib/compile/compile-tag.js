export const compileTag = (s,siblings) => {

	let attr = ' ';

	let prefix = s.name ? 
					`<${s.name}` :
					'';
	let endfix = s.name ? 
					'>' : 
					'';
	let end = s.name ? 
					`</${s.name}>` 
					: undefined;

	let content = s.content ? 
					s.content : 
					undefined;

	s.attr && s.attr.length  && s.attr.map(item=>{
		for(let key in item) attr += `${key}='${item[key]}' `;
	})

	return {
		start : `${prefix}${attr}${endfix}`,
		content : content,
		end : end,
		hasChild : s.children && s.children.length,
		closeSelf : s.closeSelf,
		siblings : siblings
	};
}