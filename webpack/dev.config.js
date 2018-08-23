/* eslint-disable no-undef */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {

    mode: 'development',

    devtool: 'source-map',

    entry: {
        'clock': './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].js',
        library: 'Clock',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.tsx', '.ts', '.jsx', '.js', 'scss', 'css']
    },

    module: {
        strictExportPresence: true,
        rules: [{
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: path.resolve(__dirname, '../src/js'),
            }, {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: {
                                discardComments: {
                                    removeAll: true
                                },
                            },
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer],
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    'limit': 40000,
                }
            },
        ]
    },

    devServer: {
        port: 2333,
        compress: true,
        contentBase: path.resolve(__dirname, '..', 'demo'),
        inline: true,
        hot: true,
        // clientLogLevel: 'none',
        quiet: false,
        open: true,
        historyApiFallback: {
            disableDotRule: true
        },
        watchOptions: {
            ignored: /node_modules/
        }
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },

    performance: {
        hints: false
    }

};
