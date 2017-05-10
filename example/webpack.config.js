const path = require('path')

module.exports = {
	entry: "./example/index.ts",
	output: {
		filename: "./example/bundle.js"
	},
	resolve: {
		extensions: ["", ".js", ".ts", ".tsx"],
		root: [
			path.resolve(__dirname, 'src/app')
		]
	},
	module: {
		loaders: [
			{ test: /\.tsx?$|\.jsx?$/, loader: "awesome-typescript-loader", exclude: /node_modules/ }
		]
	}
};
