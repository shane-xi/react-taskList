var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
module.exports = {
	entry: [
		"./app/index.js"
	],
	output: {
		path: './dist/',
		filename: "redux-index.js"
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, loader: 'babel-loader',query:{
				presets:['es2015','react']
			}},

			//解析顺序从左到右
			//.js 文件使用 jsx-loader 来编译处理
			//{ test: /\.js$/, loader: 'jsx-loader?harmony' },// 使用 ! 来链接多个loader jsx-loader已经过时
			//.css 文件使用 style-loader 和 css-loader 来处理,css-loader用于解析，而style-loader则将解析后的样式嵌入js代码
			//ExtractTextPlugin不打包css文件
			{test: /\.css$/, loader: ExtractTextPlugin.extract(["css-loader", "postcss-loader"])},
			//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
			{ test: /\.scss$/, loader: "style!css!sass"},
			//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
			{ test: /\.(png|jpg)$/, loader: 'url?limit=8192'} // 内联小于8k的base64图片，其他的直接使用URL
		]
	},
	resolve: {
		//查找module的话从这里开始查找
		root: 'E:/my_project/react-taskList/src', //绝对路径
		// 你现在可以使用 ``require('file')`` 来代替 ``require('file.coffee')`` 。
		extensions: ['', '.js', '.json', '.coffee', '.jsx','.css'],
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias:{
			AppWrap:'./components/AppWrap.js'
		}
	},
	//插件配置
	plugins: [new ExtractTextPlugin("style.css")],
	postcss: [autoprefixer()]
};