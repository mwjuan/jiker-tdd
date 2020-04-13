const _ = require('lodash');

class MarsRover {
	constructor() {
		this.initState();
		this.buildCmdRules();
		this.buildMoveRules();
	}

	execute(cmd) {
		let commands = cmd.split(' ');
		_.each(commands, x => {
			let rule = _.find(this.cmdRules, r => r.match(x));
			if (!rule) throw new Error('invalid command');

			rule.execute(x);
		});

		return `${this.location.x},${this.location.y},${this.location.d}`;
	}

	initState() {
		this.region = null;
		this.location = null;
	}

	buildCmdRules() {
		this.cmdRules = [
			{
				match: cmd => this.matchSetRegion(cmd),
				execute: cmd => this.setRegion(cmd)
			},
			{
				match: cmd => this.matchSetLocation(cmd),
				execute: cmd => this.setLocation(cmd)
			},
			{
				match: cmd => this.matchMove(cmd),
				execute: cmd => this.move(cmd)
			}
		];
	}

	// a:100,100
	matchSetRegion(command) {
		let r = /^a:[0-9]+,[0-9]+$/;
		return r.test(command);
	}

	// p:50,50,N
	matchSetLocation(command) {
		let r = /^p:[0-9]+,[0-9]+,[NSWE]$/;
		return r.test(command);
	}

	// f/b/l/r
	matchMove(command) {
		return ['f', 'b', 'l', 'r'].includes(command);
	}

	setRegion(command) {
		if (this.region) throw new Error('region can only be set once');

		let items = command.match(/\d+/g);
		this.region = {
			width: parseInt(items[0]),
			height: parseInt(items[1])
		}
	}

	setLocation(command) {
		if (!this.region) throw new Error('region must be set before set location');
		if (this.location) throw new Error('location can only be set once');

		let items = command.match(/[0-9NSWE]+/g);
		let loc = {
			x: parseInt(items[0]),
			y: parseInt(items[1]),
			d: items[2]
		}

		if (!this.isValidLocation(loc)) throw new Error('specified location out of region');

		this.location = loc;
	}

	move(command) {
		if (!this.region) throw new Error('region must be set before set location');
		if (!this.location) throw new Error('location must be set before move');

		let rule = _.find(this.moveRules, r => r.direction === this.location.d && r.action === command);
		let loc = rule.handle({ ...this.location });

		if (!this.isValidLocation(loc)) throw new Error('specified location out of region');

		this.location = loc;
	}

	buildMoveRules() {
		this.moveRules = [
			{ direction: 'N', action: 'f', handle: loc => { ++loc.y; return loc; } },
			{ direction: 'N', action: 'b', handle: loc => { --loc.y; return loc; } },
			{ direction: 'S', action: 'f', handle: loc => { --loc.y; return loc; } },
			{ direction: 'S', action: 'b', handle: loc => { ++loc.y; return loc; } },
			{ direction: 'E', action: 'f', handle: loc => { ++loc.x; return loc; } },
			{ direction: 'E', action: 'b', handle: loc => { --loc.x; return loc; } },
			{ direction: 'W', action: 'f', handle: loc => { --loc.x; return loc; } },
			{ direction: 'W', action: 'b', handle: loc => { ++loc.x; return loc; } },

			{ direction: 'N', action: 'l', handle: loc => { loc.d = 'W'; return loc; } },
			{ direction: 'N', action: 'r', handle: loc => { loc.d = 'E'; return loc; } },
			{ direction: 'S', action: 'l', handle: loc => { loc.d = 'E'; return loc; } },
			{ direction: 'S', action: 'r', handle: loc => { loc.d = 'W'; return loc; } },
			{ direction: 'E', action: 'l', handle: loc => { loc.d = 'N'; return loc; } },
			{ direction: 'E', action: 'r', handle: loc => { loc.d = 'S'; return loc; } },
			{ direction: 'W', action: 'l', handle: loc => { loc.d = 'S'; return loc; } },
			{ direction: 'W', action: 'r', handle: loc => { loc.d = 'N'; return loc; } },
		];
	}

	isValidLocation(loc) {
		return loc.x >= 0 && loc.x <= this.region.width && loc.y >= 0 && loc.y <= this.region.height;
	}
}

module.exports = MarsRover;