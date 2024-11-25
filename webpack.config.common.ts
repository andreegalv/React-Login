import { DefinePlugin, ProvidePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import path from "path";

const readEnvironments = (env:NodeJS.ProcessEnv, pattern:string) => {
	const envSaved = {}
	Object.keys(env).forEach((key) => {
		if (key.match(pattern)?.length > 0) {
			envSaved[`process.env.${key}`] = JSON.stringify(env[key]);
		}
	})
	return envSaved;
}

export const commonConfig = (env, args) => ({
	mode: args.mode,
	entry: "./src/index.js",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		plugins: [new TsconfigPathsPlugin()]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "_dist")
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: path.resolve(__dirname, "public", "index.html")
		}),
		new ProvidePlugin({
            process: "process/browser.js"
        }),
		new DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(args.mode),
			...readEnvironments(process.env, "^(ENV_APP_)")
		}),
		new CleanWebpackPlugin(),
	].filter(Boolean)
});