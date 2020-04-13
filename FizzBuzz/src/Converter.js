const _ = require('lodash');

class Converter {
	constructor() {
		[this.Fizz, this.Buzz, this.FizzBuzz] = ['Fizz', 'Buzz', 'FizzBuzz'];

		this.rules = [
			{
				match: number => number % 3 === 0 && number % 5 === 0,
				result: () => this.FizzBuzz
			},
			{
				match: number => number % 3 === 0 || _.indexOf(String(number), '3') !== -1,
				result: () => this.Fizz
			},
			{
				match: number => number % 5 === 0 || _.indexOf(String(number), '5') !== -1,
				result: () => this.Buzz
			},
			{
				match: () => true,
				result: number => number
			}
		];
	}

	parser(number) {
		if (!Number.isInteger(number)) { throw new Error('invalid number'); }
		if (number < 1 || number > 100) { throw new Error('number must between 1 and 100'); }
		return _.find(this.rules, rule => rule.match(number)).result(number);
	}
}

module.exports = Converter;
