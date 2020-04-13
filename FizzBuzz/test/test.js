const should = require('chai').should();
const Converter = require('../src/Converter');

let converter = new Converter();

describe('convert test', () => {
	it('should return success', () => {
		converter.parser(1).should.eq(1);
		converter.parser(3).should.eq('Fizz');
		converter.parser(5).should.eq('Buzz');
		converter.parser(15).should.eq('FizzBuzz');
		converter.parser(52).should.eq('Buzz');
	})

	it('should return error', () => {
		(() => converter.parser('abc')).should.throw();
		(() => converter.parser(-1)).should.throw();
	})
});