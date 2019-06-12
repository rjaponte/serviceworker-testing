import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const JSLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader'
    }]
};

const CSSLoader = {
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                sourceMap: true,
                publicPath: path.join(__dirname, '/public')
            }
        },
        {
            loader: 'css-loader',
            options: {sourceMap: true,importLoaders: 1},
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                config: {
                    path: path.join(__dirname, "postcss.config.js")
                }
            }
        }
    ]
};

module.exports = {
    JSLoader,
    CSSLoader
};