const _ = require('lodash');

class MarsRover {
	constructor() {
		this.position = { status: Status.NotLoading }, this.area = { width: 0, height: 0 };

		this.buildActionRules();
		this.buildMoveRules();
	}

	initArea(command) {
		let areaDatas = command.trim().split(/\s/);
		this.area = { width: areaDatas[0], height: areaDatas[1] };
		this.position.status = Status.Loading;
	}

	initPosition(command) {
		let loadDatas = command.trim().split(/\s/);
		this.position = { x: loadDatas[0], y: loadDatas[1], d: loadDatas[2] };
		this.position.status = Status.Move;
	}

	move(command) {
		_.each(command.trim(), m => {
			let moveRule = _.find(this.moveRules, r => r.move === m && this.position.d === r.direction);
			if (moveRule) { moveRule.exe(); }
		})

		this.over();
	}

	over() {
		if (Math.abs(this.position.x) > this.area.width / 2 || Math.abs(this.position.y) > this.area.height / 2) {
			this.position.status = Status.Over;

			if (Math.abs(this.position.x) > this.area.width / 2) { this.position.x = this.position.x > 0 ? this.area.width / 2 : -this.area.width / 2; }
			if (Math.abs(this.position.y) > this.area.height / 2) { this.position.y = this.position.y > 0 ? this.area.height / 2 : -this.area.height / 2; }

			throw new Error('Out of range');
		}
	}

	execute(command) {
		if (!(command && _.isString(command))) throw new Error('Parameter format error');

		let commands = command.trim().split(/\n/);
		_.each(commands, c => {
			let rule = _.find(this.actionRules, r => this.position.status === r.status && r.rule(c));
			if (rule) { rule.exe(c); }
		})

		if (!this.position.x || !this.position.y || !this.position.d) throw new Error('Initialization failed');

		return `${this.position.x} ${this.position.y} ${this.position.d}`;
	}

	buildActionRules() {
		this.actionRules = [
			{ status: Status.NotLoading, rule: command => command.match(/^[0-9]+\s[0-9]+$/), exe: command => this.initArea(command) },
			{ status: Status.Loading, rule: command => command.match(/^[0-9]+\s[0-9]+\s[NSWE]$/), exe: command => this.initPosition(command) },
			{ status: Status.Move, rule: command => command.match(/^[flbr]+$/), exe: command => this.move(command) },
			{ status: Status.Over, rule: () => true, exe: () => { throw new Error('Out of range') } },
			{ status: this.position.status, rule: command => !command.match(/^[0-9]+\s[0-9]+$/) && !command.match(/^[0-9]+\s[0-9]+\s[NSWE]$/) && !command.match(/^[flbr]+$/), exe: () => { throw new Error('Invalid commands') } }
		];
	}

	buildMoveRules() {
		this.moveRules = [
			{ direction: Direction.N, move: 'f', exe: () => this.updatePosition(0, 1) },
			{ direction: Direction.S, move: 'f', exe: () => this.updatePosition(0, -1) },
			{ direction: Direction.E, move: 'f', exe: () => this.updatePosition(1, 0) },
			{ direction: Direction.W, move: 'f', exe: () => this.updatePosition(-1, 0) },
			{ direction: Direction.N, move: 'b', exe: () => this.updatePosition(0, -1) },
			{ direction: Direction.S, move: 'b', exe: () => this.updatePosition(0, 1) },
			{ direction: Direction.E, move: 'b', exe: () => this.updatePosition(-1, 0) },
			{ direction: Direction.W, move: 'b', exe: () => this.updatePosition(1, 0) },

			{ direction: Direction.N, move: 'l', exe: () => this.updatePosition(0, 0, Direction.W) },
			{ direction: Direction.N, move: 'r', exe: () => this.updatePosition(0, 0, Direction.E) },
			{ direction: Direction.W, move: 'l', exe: () => this.updatePosition(0, 0, Direction.S) },
			{ direction: Direction.W, move: 'r', exe: () => this.updatePosition(0, 0, Direction.N) },
			{ direction: Direction.S, move: 'l', exe: () => this.updatePosition(0, 0, Direction.E) },
			{ direction: Direction.S, move: 'r', exe: () => this.updatePosition(0, 0, Direction.W) },
			{ direction: Direction.E, move: 'l', exe: () => this.updatePosition(0, 0, Direction.N) },
			{ direction: Direction.E, move: 'r', exe: () => this.updatePosition(0, 0, Direction.S) }
		];
	}

	updatePosition(x, y, d) {
		if (x) { this.position.x = (parseInt(this.position.x) + x).toString(); }
		if (y) { this.position.y = (parseInt(this.position.y) + y).toString(); }
		if (d) { this.position.d = d; }
	}
}

const Direction = { N: 'N', E: 'E', S: 'S', W: 'W' };
const Status = { NotLoading: "notLoading", Loading: 'loading', Move: 'move', Over: 'over' };

module.exports = MarsRover;