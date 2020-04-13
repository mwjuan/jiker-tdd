class NumberConverter {
	convert(number) {
		if(!Number.isInteger(number)) {
			throw new Error('invalid number.');
		}

		if(number <= 0) {
			throw new Error('number must large than zero.')
		}

		let ret = '';
		if(number % 3 === 0) {
			ret += 'Fizz';
		}

		if(number % 5 === 0) {
			ret += 'Buzz';
		}

		if(!ret) {
			ret = number.toString();
		}

		return ret;
	}
}

module.exports = NumberConverter;