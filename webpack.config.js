const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry      : {
        common: './src/js/common.js',
        index : './src/js/index.js',
    },
    performance: {
        hints: false
    },

    output      : {
        path    : path.resolve(__dirname + '/dist'),
        filename: 'js/[name].bundle.js'
    },
    watch       : true,
    devServer   : {
        contentBase: './dist',
        hot        : true
    },
    module      : {
        rules: [
            {
                test: /\.scss$/,
                use : [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader : 'css-loader',
                        options: {sourceMap: true},

                    }, {
                        loader : 'postcss-loader',
                        options: {sourceMap: true, config: {path: 'postcss.config.js'}},

                    }, {
                        loader : 'sass-loader',
                        options: {sourceMap: true}

                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use : [
                    {
                        loader : 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                        },
                    },
                    {
                        loader : 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality    : 100
                            }
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '~',
            name                  : true,
        }
    },

    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host  : 'localhost:3000',
            files : ['dist'],
            server: {baseDir: ['dist']},
        }),
        /*****************Start HTML plugins**************/
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html',
            chunks  : ['index', 'common']
        }),
        /*****************END HTML plugins**************/
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
        }),

        new CleanWebpackPlugin([
            './dist/**/*.*'
        ]),
        new webpack.ProvidePlugin({
            $              : 'jquery',
            jQuery         : 'jquery',
            'window.jQuery': 'jquery'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp          : /\.css$/g,
            cssProcessor             : require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            },
            canPrint                 : true
        })
    ]
};
