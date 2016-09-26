/* webpack.config.js
 * @ Cong Min
 */
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: ['./src/js/index.js'],
        '../dist/tagcloud.min': ['./src/tagcloud/tagcloud.js']
    },
    output: {
        path: './example',
        filename: '[name].js?[chunkhash:8]'
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'],
            inject: 'body'
        }),
        new HtmlPlugin({
            template: './src/demo.html',
            filename: 'demo.html',
            chunks: [''],
            inject: 'body'
        }),
        new ExtractTextPlugin('[name].css?[contenthash:8]'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.html$/, loader: 'html'
        },  {
            test: /\.css$/, loader: ExtractTextPlugin.extract(['css'])
        },  {
            test: /\.(png|jpg|gif)$/, loaders: [ 'url?limit=8192&name=img/[name].[ext]?[hash:8]', 'image-webpack' ]
        }],
        resolve: {
            extensions: ['', '.js']
        }
    }
};