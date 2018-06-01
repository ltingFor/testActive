const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
// const ExtractPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack')
const config = {
    target: 'web',
    entry: path.join(__dirname, './src/main.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist'),
        publicPath:'/investAndGetMoney/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                query: {
                    presets: ["es2015"]
                }
              }
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        port: 8001,
        proxy: {
          '/api': {
            target: 'http://192.168.0.123/static',
            changeOrigin: true,
            pathRewrite: {'/api/' : ''},
            secure: false
          }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new CleanWebpackPlugin(['dist']),
        new HTMLPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
              }
        })
    ]
}
module.exports = config