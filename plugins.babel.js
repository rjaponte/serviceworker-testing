import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as workboxWebpackPlugin from 'workbox-webpack-plugin';

const impl = new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
    chunkFilename: '[id].css'
});

const workboxPluginImpl = new workboxWebpackPlugin.InjectManifest({
    swSrc: './src/sw.js',
    swDest: './service-worker.js'
});

module.exports = {
    MiniCssExtractPlugin: impl,
    WorkboxWebpackPlugin: workboxPluginImpl
}