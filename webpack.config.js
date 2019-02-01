const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成模板文件
const webpack = require('webpack');
module.exports = {
    //项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    entry: [
        'babel-polyfill',
        './src/main.js'
    ],
    output: {
        path: path.resolve(__dirname, './dist'),//项目的打包文件路径
        publicPath: "./dist/", //通过devServer访问的路径
        filename: "build.js" //打包后的文件名
    },
    devServer: {
        //contentBase: path.join(__dirname, './dist'), //静态资源
        historyApiFallback: true,//任何404响应都被替代为index.html
        overlay: true //当出现编译器错误或警告时，在浏览器中显示全屏覆盖。默认情况下禁用。如果只想显示编译器错误
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'  //sass-loader默认处理不基于缩进的 scss 语法
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax' //indentedSyntax:true处理基于缩进的scss语法
                        ]
                    }
                }
            },
            {    //从下到上执行
                test: /\.css$/,
                use: [
                    'vue-style-loader', //将css插入到html的style标签
                    'css-loader'  //用模块化的写法引用css
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/  //忽略node_modules文件夹下的文件，不用转码
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        //https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required
        //Vue-loader v15之后的版本需要依赖一个插件
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname,'index.html')
        }),
    ],
    //为了增强调试可读性，如果在控制台打印的话，可以定位到某个文件的某行代码
    devtool: '#eval-source-map' // 将 SourceMap 嵌入到每个模块中
}

/*if(process.env.NODE_ENV === 'production') {
    //生产环境
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        //webpack4移除了此属性，用minimize代替
        //https://webpack.js.org/configuration/optimization/#optimization-minimize
        //new webpack.optimize.UglifyJsPlugin()
    ]);
    module.exports.optimization = {
        minimize: false
    }
}*/
