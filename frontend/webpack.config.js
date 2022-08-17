var webpack = require("webpack");
var path = require("path");
var package = require("./package.json");

// variables
var isProduction = false;
var sourcePath = path.join(__dirname, "./src");
var outPath = path.join(__dirname, "./build");

// plugins
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
	context: sourcePath,
	entry: {
		app: "./main.tsx",
	},
	output: {
		path: outPath,
		filename: isProduction ? "[contenthash].js" : "[fullhash].js",
		chunkFilename: isProduction
			? "[name].[contenthash].js"
			: "[name].[fullhash].js",
	},
	target: "web",
	resolve: {
		extensions: [".js", ".ts", ".tsx"],
		// Fix webpack's default behavior to not load packages with jsnext:main module
		// (jsnext:main directs not usually distributable es6 format, but es6 sources)
		mainFields: ["module", "browser", "main"],
		alias: {
			app: path.resolve(__dirname, "src/app/"),
			variables: path.resolve(__dirname, "src/variables.css"),
			src: path.resolve(__dirname, "src/"),
			moment: "moment/moment.js",
		},
	},
	module: {
		rules: [
			// .ts, .tsx
			{
				test: /\.tsx?$/,
				use: [
					!isProduction && {
						loader: "babel-loader",
						options: {
							plugins: [
								"react-refresh/babel",
								[
									"import",
									{
										libraryName: "moment",
									},
									"moment",
								],
							],
							presets: ["@babel/preset-env"],
						},
					},
					{
						loader: "ts-loader", options: {
							getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
						}
					},
				].filter(Boolean),
			},
			{
				test: /\.[j]sx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					plugins: ["react-refresh/babel"],
				},
			},
			// static assets
			{ test: /\.html$/, use: "html-loader" },
			{ test: /\.(a?png|svg)$/, use: "url-loader?limit=10000" },
			{
				test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
				use: "file-loader",
			},
		],
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					filename: isProduction
						? "vendor.[contenthash].js"
						: "vendor.[fullhash].js",
					priority: -10,
				},
			},
		},
		//runtimeChunk: true,
	},

	plugins: [
		new BundleAnalyzerPlugin(),
		new webpack.EnvironmentPlugin({
			NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
			DEBUG: false,
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "assets/index.html",
			minify: {
				minifyJS: true,
				minifyCSS: true,
				removeComments: true,
				useShortDoctype: true,
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
			},
			append: {
				head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
			},
			meta: {
				title: package.name,
				description: package.description,
				keywords: Array.isArray(package.keywords)
					? package.keywords.join(",")
					: undefined,
			},
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
		new ReactRefreshWebpackPlugin(),
	],
	devServer: {
		static: sourcePath,
		hot: true,
		liveReload: true,
		historyApiFallback: {
			disableDotRule: true,
		},
		client: {
			logging: "warn",
		},
	},
	stats: "minimal",
	// https://webpack.js.org/configuration/devtool/
	devtool: isProduction
		? "hidden-source-map"
		: "eval-cheap-module-source-map",
};
