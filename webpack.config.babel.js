import path from 'path';
import webpack from 'webpack';

export default function() {
    const entry = {
        'squery': './src/squery.js',
        'squery.min': './src/squery.js',
    };

    return {
        entry,

        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js',
            publicPath: '/',
            libraryTarget: 'umd'
        },

        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true,
                output: {
                    comments: false
                }
            })
        ],

        node: { Buffer: false },

        module: {
            loaders: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env"
                            ]
                        }
                    }
                ],
            }]
        },

        stats: { colors: true },

        devtool: false
    }
};