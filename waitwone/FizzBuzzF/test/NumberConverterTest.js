const should = require('chai').should();

const NumberConverter = require('../src/NumberConverter');

describe('NumberConverterTest', () => {
	let converter = new NumberConverter();

	it('correct', () => {
		converter.convert(1).should.eq('1');
		converter.convert(2).should.eq('2');
		converter.convert(3).should.eq('Fizz');
		converter.convert(4).should.eq('4');
		converter.convert(5).should.eq('Buzz');
		converter.convert(6).should.eq('Fizz');
		converter.convert(7).should.eq('7');
		converter.convert(8).should.eq('8');
		converter.convert(9).should.eq('Fizz');
		converter.convert(10).should.eq('Buzz');
		converter.convert(15).should.eq('FizzBuzz');
		converter.convert(16).should.eq('16');
		converter.convert(50).should.eq('Buzz');
		converter.convert(100).should.eq('Buzz');
	});

	it('invalid number', () => {
		(() => converter.convert('1')).should.throw();
		(() => converter.convert('abc')).should.throw();
		(() => converter.convert(true)).should.throw();
		(() => converter.convert(false).should.throw());
		(() => converter.convert(1.23)).should.throw();
	});

	it('number less than 1', () => {
		(() => converter.convert(-3)).should.throw();
		(() => converter.convert(-1)).should.throw();
		(() => converter.convert(0)).should.throw();
	});

});