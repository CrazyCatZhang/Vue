const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'dist',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'page'),
        port: 9000,
        open: true,
        hot: true
    }
}