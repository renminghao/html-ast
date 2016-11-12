import 'babel-polyfill';
import {resolve as PathResolve} from 'path';
import {Compile} from '../dist/index';
import {readFile} from 'fs';

const getFileContent = function (path) {
	return new Promise(resolve => {
		readFile(PathResolve(__dirname, path), (err,data) => {
			if(err) console.log(err);
			resolve(data.toString());
		})
	})
}

const get = async function () {
	const data = await getFileContent('./compile.ept');
	const result = Compile(data);
	console.log(JSON.stringify(result));
}

get().then().catch(e=>console.log(e));