const should = require('chai').should();

const MarsRover = require('../src/MarsRover');

describe('MarsRoverTest', () => {

	it('success case', () => {
		let marsRover = new MarsRover();
		marsRover.execute('a:100,100 p:50,50,N').should.eq('50,50,N');
		marsRover.execute('f f f').should.eq('50,53,N');
		marsRover.execute('b b b').should.eq('50,50,N');
		marsRover.execute('r f f f').should.eq('53,50,E');
		marsRover.execute('b b b b b').should.eq('48,50,E');
		marsRover.execute('r f f f').should.eq('48,47,S');
		marsRover.execute('b b b').should.eq('48,50,S');
		marsRover.execute('r f f f b').should.eq('46,50,W');
		marsRover.execute('l f f f b').should.eq('46,48,S');
		marsRover.execute('l f f f b').should.eq('48,48,E');
		marsRover.execute('l f f f b').should.eq('48,50,N');
		marsRover.execute('l f f f b').should.eq('46,50,W');
		marsRover.execute('f f r f f f b r f f l b b r r r f').should.eq('45,50,W');
	});

	it('invalid command format', () => {
		let marsRover = new MarsRover();
		(() => marsRover.execute('a:')).should.throw();
		(() => marsRover.execute('xxx')).should.throw();
		(() => marsRover.execute('p:100 100;')).should.throw();
		(() => marsRover.execute('ff bb rr ll')).should.throw();
	});

	it('invalid command order', () => {
		let marsRover = new MarsRover();
		(() => marsRover.execute('r f f f')).should.throw();
		(() => marsRover.execute('p:50,50,N')).should.throw();
		(() => marsRover.execute('l f f f b')).should.throw();
	});

	it('location out of region', () => {
		let marsRover = new MarsRover();
		(() => marsRover.execute('a:100,100 p:250,250,N')).should.throw();
		(() => marsRover.execute('p:0,0,N b b')).should.throw();
	});
});

