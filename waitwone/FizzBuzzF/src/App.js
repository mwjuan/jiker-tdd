const NumberConverter = require('./NumberConverter');

let converter = new NumberConverter();
for(let i = 1; i <= 100; ++i) {
	console.log(converter.convert(i));
}