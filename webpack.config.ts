/* eslint-disable @typescript-eslint/no-require-imports */
const { merge } = require("webpack-merge");
const { config } = require("dotenv");
const { commonConfig } = require("./webpack.config.common");
const { devConfig } = require("./webpack.config.dev");

module.exports = (env, args) => {
	switch(args.mode) {
		case 'development':
			config({ path: `${__dirname}/.env.dev` });
			return merge(commonConfig(env, args), devConfig(env, args));
		default:
			throw new Error('No matching configuration was found!');
	}
}