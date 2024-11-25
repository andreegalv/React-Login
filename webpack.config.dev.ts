export const devConfig = () => ({
	devtool: "inline-source-map",
	devServer: {
		port: process.env.ENV_APP_REACT_HOST_PORT,
		historyApiFallback: {
			index: "/index.html"
		}
	},
	output: {
		publicPath: `http://localhost:${process.env.ENV_APP_REACT_HOST_PORT}/`,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true
				},
				exclude: /dist/
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react", "@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					}
				}
			}
		]
	}
})