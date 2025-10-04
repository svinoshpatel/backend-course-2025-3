const { program } = require('commander');
const fs = require('fs');

program
	.requiredOption('-i, --input <path>', 'path to input file')
	.option('-o, --output <path>', 'path to output file')
	.option('-d, --display', 'print result in console')
	.option('-v, --variety', 'display flower variety')
	.option(
		'-l, --length <number>',
		'filter: petal length more than given',
		parseFloat
	);

program.parse();
const options = program.opts();

if (!options.input) {
	console.error('Please, specify input file');
	process.exit(1);
};

if (!fs.existsSync(options.input)) {
	console.error('Cannot find input file');
	process.exit(1);
};

const rawData = fs.readFileSync(options.input, 'utf8');
let data = rawData
	.split('\n')
	.filter(line => line.trim().length > 0)
	.map(line => JSON.parse(line));

if (options.length)
	data = data.filter(item => item['petal.length'] > options.length);

let result = '';
data.forEach(item => {
	let line = `${item['petal.length']} ${item['petal.width']}`;
	if (options.variety)
		line += ` ${item.variety}`;
	result += line + '\n';
});

if (options.display)
	console.log(result);

if (options.output)
	fs.writeFileSync(options.output, result);

