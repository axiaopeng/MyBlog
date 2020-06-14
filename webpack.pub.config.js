const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        "main": path.join(__dirname, './src/main.js'),
        "details": path.join(__dirname, './src/details.js')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html', //生成文件名， 可以在文件名前面加路径  如 dist/index.html
            chunks: ['main'], //区分打包后导入的js文件
            minify: {
                collapseWhitespace: true, // 合并多余的空格
                removeComments: true, //移除注释
                removeAttributeQuotes: true //移除属性上的双引号 
            }
        }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/details.html'),
            filename: 'details.html', //生成文件名， 可以在文件名前面加路径  如 dist/index.html
            chunks: ['details'], //区分打包后导入的js文件
            minify: {
                collapseWhitespace: true, // 合并多余的空格
                removeComments: true, //移除注释
                removeAttributeQuotes: true //移除属性上的双引号 
            }
        }),
        new CleanWebpackPlugin(),
        new ExtractTextPlugin("css/[name].css"),
        new OptimizeCssAssetsPlugin()
    ],
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/, // 判断引入库是否是node_modules里的
    //                 name: 'jquery',
    //                 filename: 'js/[name].js',
    //                 chunks: 'initial',
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../' // 指定抽取的时候，自动为我们的路径添加../前缀
                })
            },
            { test: /\.(png|gif|bmp|jpg)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]&esModule: false' }, //在文件名字前面可以加路径
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}