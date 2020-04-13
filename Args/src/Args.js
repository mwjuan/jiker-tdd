const _ = require('lodash');

class Args {
	constructor(props) {
		this.defaultMap = {
			l: { type: Boolean, default: false, isValid: (arg) => _.isBoolean(arg) },
			d: { type: String, default: '', isValid: () => true },
			p: { type: Number, default: 0, isValid: (arg) => _.isNumber(arg) && arg % 1 === 0 },
			g: { type: Array, default: [], isValid: (arg) => _.isArray(arg) },
			n: { type: Array, default: [], isValid: (arg) => _.isArray(arg) }
		};
		this.commands = [];
		this.schemas = props ? this.getSchema(props.schema) : [];
	}

	getSchema(schema) {
		if (!schema) { return; }

		let result = [];
		let schemas = schema.split(',');
		_.each(schemas, each => {
			let rule = each.split(':');
			if (rule.length === 2) {
				let key = _.first(rule).trim();
				if (!result[key]) {
					if (this.defaultMap[key]) {
						result.push({ key, default: this.defaultMap[key].default });
					}
				}
			}
		})

		return result;
	}

	setCommand(command) {
		if (!command) {
			return;
		}

		let result = [], commands = command.split(' ');

		_.each(this.schemas, s => {
			let command = _.find(commands, c => c === `-${s.key}`);
			if (command && !_.includes(result, { key: command })) {
				let value = commands[_.indexOf(commands, command) + 1];
				if (this.isValue(value)) {
					if (this.convert(value)) {
						value = this.convert(value);
					}
					result.push({ key: command, value })
				} else {
					result.push({ key: command, value: s.default });
				}
			}
		})

		this.commands = result;
	}

	isValue(arg) {
		if (!arg || (_.includes(arg, '-') && arg.length === 2 && !Number(arg))) { return false; }
		return true;
	}

	convert(value) {
		try {
			let result = JSON.parse(value);
			return result;
		} catch (error) {
			return;
		}
	}

	parser(arg) {
		let command = _.find(this.commands, c => c.key.substr(1) === arg);
		if (command) {
			if (this.defaultMap[arg].isValid(command.value)) {
				return command.value;
			} else {
				throw new Error('invalid value');
			}
		}
		throw new Error('invalid schema');
	}
}

module.exports = Args;