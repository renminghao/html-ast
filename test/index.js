import 'babel-polyfill';
import {Parse} from '../dist/index';
import {readFile} from 'fs';
import {resolve as pathResolve} from 'path';

const getContent = (path)=>{
	return new Promise(resolve=>{
		readFile(pathResolve(__dirname, path),(err,data)=>{
			if(err) console.log(err);
			resolve(data.toString());
		})
	})
}

const get = async function (){
	const content = await getContent('./index.ept')
	const result = Parse(content);
	console.log(JSON.stringify(result, null, 2))
}

get().then().catch(e=>console.log(e));