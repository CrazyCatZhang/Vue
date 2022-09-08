const path = require('path');

module.exports = {
    mode: 'development',

    entry: './src/index.js',

    output: {
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'page'),
        compress: false,
        publicPath: '/',
        port: 8080,
        open: true,
        hot: true
    },

    devtool: 'source-map'
}