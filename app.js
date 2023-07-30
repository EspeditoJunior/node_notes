const validator = require('validator')
const chalk = require('chalk')
const notes = require('./notes.js')

console.log(validator.isEmail('e.jr42@hotmail.com'));
console.log(validator.isURL('e.jr42@hotmail.com'));
console.log(notes())
console.log(chalk.green(
	'I am a green line ' +
	chalk.blue.underline.bold('with a blue substring') +
	' that becomes green again!'
))