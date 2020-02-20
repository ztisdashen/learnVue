const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackMissingModule = require("webpack-merge");
const baseConfig = require("./base.config");
module.exports=webpackMissingModule(baseConfig,{
    plugins:[
        new UglifyJsPlugin()
    ],
});
// module.exports = {
// //     plugins:[
// //         new UglifyJsPlugin()
// //     ],
// // };