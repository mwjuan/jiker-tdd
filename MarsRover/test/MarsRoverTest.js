const should = require('chai').should();
const _ = require('lodash');
const sinon = require('sinon');
const MarsRover = require('../src/MarsRover');

describe('MarsRoverTest', () => {
	sinon.fake();
	it('usage', () => {
		let marsRover = new MarsRover();
		marsRover.execute('10 10\n0 0 N\nfl').should.eq('0 1 W');
	});

	it('should sucess', () => {
		let marsRover = new MarsRover();
		_.each([
			{ command: '10 10\n0 0 N\nfl', result: '0 1 W' },
			{ command: '100 100\n0 2 S\nbrl', result: '1 1 W' },
			{ command: 'br', result: '2 1 N' },
			{ command: '10 10 N\nffl', result: '2 3 W' },
			{ command: '0 10 N\nllbbrfflf', result: '1 1 E' },
			{ command: 'ffl', result: '3 1 N' },
			{ command: '\nffrbffl', result: '4 3 N' },
			{ command: 'flb', result: '5 4 W' },
		], ({ command, result }) => {
			marsRover.execute(command).should.eq(result);
		})
	});

	it('out of range error', () => {
		let marsRover = new MarsRover();
		marsRover.execute('10 10\n0 0 N\nff').should.eq('0 2 N');
		(() => marsRover.execute('fffff')).should.throw('Out of range');
		(() => marsRover.execute('flbr')).should.throw('Out of range');
	});

	it('command parameter error', () => {
		let marsRover = new MarsRover();
		(() => marsRover.execute()).should.throw();
		(() => marsRover.execute(123)).should.throw();
		(() => marsRover.execute('123')).should.throw();
		(() => marsRover.execute('abcd')).should.throw();
		(() => marsRover.execute('a bcd')).should.throw();
		(() => marsRover.execute('a\nbcd')).should.throw();
		(() => marsRover.execute('a\nb c d')).should.throw();
		(() => marsRover.execute('a\nb c d\n6')).should.throw();
		(() => marsRover.execute('13\nb c d\n6')).should.throw();
		(() => marsRover.execute('0 0 N\nblf')).should.throw();
		(() => marsRover.execute('blf')).should.throw();
		(() => marsRover.execute('20 20\nb c N\n6')).should.throw();
		(() => marsRover.execute('20 20\n0\n6')).should.throw();
		(() => marsRover.execute('20 20\n0 5 D\n6')).should.throw();
		(() => marsRover.execute('20 20\n0 5 5\n6')).should.throw();
	});
});