const path = require('path');

module.exports = {
    entry: './build-tsc/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: "source-map",
    mode: "development",
};