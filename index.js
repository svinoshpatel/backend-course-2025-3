const { program } = require('commander');

program
	.requiredOption('-i, --input <path>')
	.option('-o, --output <path>')
	.option('-d, --display');

program.parse();
const options = program.opts();

