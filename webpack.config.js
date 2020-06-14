const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
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
        })
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png|gif|bmp|jpg)$/, use: 'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]&esModule: false' }, //在文件名字前面可以加路径
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}