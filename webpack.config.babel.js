import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';


import loaders from './loaders.babel';
import plugins from './plugins.babel';

export default {
    mode: 'development',
    entry: path.join(__dirname, 'src/app.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [ 
            loaders.JSLoader,
            loaders.CSSLoader 
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/public/index.html'),
            inject: 'head'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defer: 'main',
            module: 'main'
        }),
        plugins.MiniCssExtractPlugin,
        plugins.WorkboxWebpackPlugin
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};