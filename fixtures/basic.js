const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = [
	autoprefixer(['chrome >= 10', 'Firefox >= 20']),
	cssnano(),
	{ map: false },
];
