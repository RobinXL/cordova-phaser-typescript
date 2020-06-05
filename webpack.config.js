var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
    entry: './src/game.ts',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'www/js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/'},
            {test: /phaser\.js$/, loader: 'expose-loader?Phaser'}
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: path.resolve(__dirname, 'www/assets')
            }
        ]),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'www'),
        host: '127.0.0.1',
        port: 8080,
        open: true,
        watchContentBase: true,
        watchOptions: {
            poll: 1000
        }
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            phaser: phaser
        }
    }
};
