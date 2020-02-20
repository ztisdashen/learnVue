const path = require("path");
module.exports = {
    entry:"./src/main.js",
    output:{
        path:path.resolve(__dirname,'dist'), //需要绝对路径
        filename:"bundle.js"
    }
};