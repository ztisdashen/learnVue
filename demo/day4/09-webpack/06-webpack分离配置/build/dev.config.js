const webpackMissingModule = require("webpack-merge");
const baseConfig = require("./base.config");
module.exports = webpackMissingModule(baseConfig, {
    devServer: {
        contentBase: './dist',
        inline: true
    }
});