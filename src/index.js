import postcss from 'postcss';
import _ from 'lodash';
import chalk from 'chalk';
import { cache, matcher } from 'exhibit';

const defaults = {
	match: '**/*.css',
	map: true,
};

export default function (...plugins) {
	let _options;
	if (_.isPlainObject(plugins[plugins.length - 1])) {
		_options = plugins.pop();
	}

	const options = _.assign({}, defaults, _options);
	const match = matcher(options.match);

	const processor = postcss(plugins);

	return cache(async (content, name) => {
		if (!match(name)) return content;

		return processor
			.process(content.toString(), options)
			.then(result => {
				for (const warning of result.warnings()) {
					console.warn(
						chalk.yellow(`exhibit-plugin-postcss: warning for ${name}\n  `) +
						warning.toString()
					);
				}

				return result.css;
			});
	});
}
