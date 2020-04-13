const Converter = require('./Converter');

let converter = new Converter();

for (let index = 1; index <= 100; index++) {
	console.log(converter.parser(index));
}