# day5 Vuejs

## webpack

### less文件打包

`npm install --save-dev less-loader less`

**配置**

```javascript
module:{
    rules:[
        {test: /\.less$/,
        use:[
            {loader:'style-loader'},{loader:'css-loader'},{loader:'less-loader'}
        ]}
    ]
}
```

### 图片资源

`npm install --save-dev url-loader`

```javascript
{
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    {loader:'url-loader',options:{limit:30000}}
                ]
            }
```

**当大于limit时使用file-loader**

**但是没有图片显示**，因为在运行完`npm run biuld`后，在dist文件夹中出现了一个新的图片，但是默认图片路径在主文件夹里面，不是在dist中，需要修改webpackconfig.js

```javascript
    output: {
        path: path.resolve(__dirname, 'dist'), //需要绝对路径
        filename: "bundle.js",
        publicPath: "dist/" //在所url里都会加入dist/
    }
```

但是新的图片是一个hash名字，因此需要一定的配置`{loader:'url-loader',options:{limit:30000,name: 'img/[name].[hash:8].[ext]'}}`



### ES6语法处理

> 存在一些浏览器不支持ES6，因此需要将ES6转化成ES5语法
>
> `npm install --save-dev babel-loader@7 babel-core babel-preset-es2015`

配置webpack-config.js

```json
{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
```

```error
原因：babel将前端环境更新到babel7，jest-babel之前是基于babel6的，执行时候就会报：Requires Babel “^7.0.0-0”, but was loaded with “6.26.3”.

解决：npm i babel-core@^7.0.0-bridge.0 @babel/core regenerator-runtime

```

### webpack配置Vue

`npm install vue --save`

> runtime -only   ---->不能有任何template
>
> runtime-compiler--------------->可以有template
>
> 需要修改webpack配置

```json
    resolve:{
        alias:{
            "vue$":'vue/dist/vue.esm.js'
        }
    }
```

## template 和 el

### 完整Vue

`npm install vue-loader vue-template-compiler --save-dev`

**配置**

```json
{
                test:/\.vue$/,
                use:['vue-loader']
            }
```

* `npm run biuld`出错因为vue-loader的level太高，需要安装额外的插件。修改package.json的版本^13.0.0 

* 在执行**`npm install`**

### webpack的plugin

* 通过npm安装需要的plugin（webpack内置的不需要安装）

* 在webpack.config.js里配置

  1. 为打包文件加上版权声明

     1. BannerPlugin webpack自带的插件

  2. 修改webpack.config.js配置

     ```javascript
     const webpack = require('webpack');
         plugins:[
             new webpack.BannerPlugin("最终解释权归ztisdashen所有")
         ]
     ```

  3. 重新打包，查看bundle.js头部信息



#### html plugin

> 当前index.html在根目录下，但是打包后需要在dist目录下，因此需要插件HtmlWebpackPlugin

* 自动生成index.html
* 将打包的js文件通过script标签导入

1. 安装`npm install html-webpack-plugin --save-dev`

2. 修改配置文件

   ```javascript
   const Html = require("html-webpack-plugin");
   module.exports = {
       plugins:[
           new webpack.BannerPlugin("最终解释权归ztisdashen所有"),
           new Html({
               template:"index.html"
           })
       ]
   };
   ```

- `npm i -D html-webpack-plugin #-D = --save-dev` 错了？？？

  3.在dist中就会产生一个index.html，其中没有div(app),修改script标签，同时配置文件中不需要公共的publickpath

  4. 可以修改原来根目录下的index.html删除script标签，因为其会自动插入



#### js压缩plugin

1. 删除打包文件中的空格，不必要的空间
2. `npm install uglifyjs-webpack-plugin@1.1.1 --save-dev `
3. 配置

```javascript
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
    plugins:[
        new webpack.BannerPlugin("最终解释权归ztisdashen所有"),
        new Html({
            template:"index.html"
        }),
        new UglifyJsPlugin()
    ]
};
```



#### 搭建本地服务器

1. `npm install --save-dev webpack-dev-server@2.9.1`不是一个单独的模块，需要在webpack之前安装他,通过网络进行控制
2. devserver是一个选型，包含属性
   1. contentBase 服务于那个文件夹 dist
   2. port端口
   3. inline：实时监控
   4. historyApiFallback
3. `webpack-dev-server`跑起来 这是局部安装，需要进入目录，是本地命令，可以修改或者在package.json中修改

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"  # webpack-dev-server --open 自动打开浏览器
  }
```

**不仅以修改丑化，因为会修改变量名**

* 在打包时需要配置

* 在发布时进行配置

* 因此需要对配置文件进行分离

  * `npm install webpack-merge -D` 合并配置

    **base**

    ```javascript
    // 任何时都依赖的文件放在这里
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
        ],
    };
    ```

    **开发依赖**

```javascript
const webpackMissingModule = require("webpack-merge");
const baseConfig = require("./base.config");
module.exports = webpackMissingModule(baseConfig, {
    devServer: {
        contentBase: './dist',
        inline: true
    }
});
```

**发布以来**

```javascript
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackMissingModule = require("webpack-merge");
const baseConfig = require("./base.config");
module.exports=webpackMissingModule(baseConfig,{
    plugins:[
        new UglifyJsPlugin()
    ],
});
```

**修改package.json**

```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/prob.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
  }
```

* 但是删除dist目录下内容后，运行npm run build，dist中没有内容，发现到build文件中，因为是在build当前目录下 ，因此修改base配置，将dist变为../dist







## vue cli

>  command-line-interface 命令行界面简称脚手架

### 安装

**`npm install -g @vue/cli`**

1. npm install -g @vue/cli
2. 上面安装的是vue cli 4.X
3. 拉去2.x的版本

```bash
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

4. vue 2.x `vue init webpack my-project`
5. vue >=3.0 `vue create project`

### 2.X

1. project name
2. Project description
3. Author ztisdashen
4. build
   - [x] Runtime + Compiler 
   - [ ] Runtime-only
- [ ] vue router
- [x] ESlint  遵守某些js规范
  - [x] Standard (https://github.com/standard/standard)
  - [ ] Airbnb (https://github.com/airbnb/javascript)
  - [ ] none (configure it yourself)   

- [ ] unit test
- [ ] 2e2 test

5. npm or yarn   **npm**

![](E:\web\vue\img\TIM截图20200128220313.jpg)

### vue cli 目录结构

* build **webpack的配置**
* config **webpack的配置**

![](E:\web\vue\img\TIM截图20200129124720.jpg)

* **.babelrc**