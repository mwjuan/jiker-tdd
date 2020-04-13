const should = require('chai').should();
const Args = require('../src/Args');

describe('Args Parser Test', () => {
	let args = new Args({ schema: 'l: bool, d: string, p: number' });

	it('should return success', () => {
		args.setCommand('-l true -p 8080 -d /usr/logs');
		args.parser('l').should.eq(true);
		args.parser('p').should.eq(8080);
		args.parser('d').should.eq('/usr/logs');
	})

	it('should return default', () => {
		args.setCommand('-l -p -d');
		args.parser('l').should.eq(false);
		args.parser('p').should.eq(0);
		args.parser('d').should.eq('');
	})

	it('should return error info', () => {
		args.setCommand('-l true -p -1.1 -x local');
		(() => args.parser('x')).should.throw();
		(() => args.parser('p')).should.throw();
	})
});