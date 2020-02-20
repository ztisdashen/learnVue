const path = require("path");
const webpack = require('webpack');
// const Html = require('http-webpack-plugin');
// const Html = require("html‐webpack‐plugin");
const Html = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
    entry: "./main.js",
    output: {
        path: path.resolve(__dirname, 'dist'), //需要绝对路径
        filename: "bundle.js",
        // publicPath: "dist/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //css loader将css文件加载
                //style loader 渲染到dom中
                //从右向左使用
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'less-loader'}
                ]
            },{
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    {loader:'url-loader',options:{limit:30000,name: 'img/[name].[hash:8].[ext]'}}
                ]
            },{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },{
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]
    },
    resolve:{
        extensions:['.js','.vue','.css'] ,
        alias:{
            //可以省略后缀
            "vue$":'vue/dist/vue.esm.js'
        }
    },
    plugins:[
        new webpack.BannerPlugin("最终解释权归ztisdashen所有"),
        new Html({
            template:"index.html"
        }),
        new UglifyJsPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        inline: true
    }
};