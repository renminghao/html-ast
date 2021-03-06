'use strict';

require('babel-polyfill');

var _path = require('path');

var _index = require('../dist/index');

var _fs = require('fs');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getFileContent = function getFileContent(path) {
	return new Promise(function (resolve) {
		(0, _fs.readFile)((0, _path.resolve)(__dirname, path), function (err, data) {
			if (err) console.log(err);
			resolve(data.toString());
		});
	});
};

var get = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
		var data, result;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return getFileContent('./compile.ept');

					case 2:
						data = _context.sent;
						result = (0, _index.Compile)(data);

						console.log(JSON.stringify(result));

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function get() {
		return _ref.apply(this, arguments);
	};
}();

get().then().catch(function (e) {
	return console.log(e);
});