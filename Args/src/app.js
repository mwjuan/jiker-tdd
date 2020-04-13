const Args = require('./Args');

let main = () => {
	let args = new Args({ schema: 'l: bool, d: string, p: number, g: array, n: array' });

	args.setCommand('-l true -p 8080 -d /usr/logs -g ["this","is","a","list"] -n [1,2,3,-5]');
	console.log(args.parser('p')); // 8080
	console.log(args.parser('l')); // true
	console.log(args.parser('d')); // /usr/logs
	console.log(args.parser('g')); // [ 'this', 'is', 'a', 'list' ]
	console.log(args.parser('n')); // [ 1, 2, 3, -5 ]

	args.setCommand('-l -p -d');
	console.log(args.parser('p')); // 0
	console.log(args.parser('l')); // false
	console.log(args.parser('d')); // ''

	args.setCommand('-l true -p 1.1 -x local');
	try {
		//args.parser('p'); // invalid value
		//args.parser('x'); // invalid schema
	} catch (error) {
		throw error;
	}
};

main();

