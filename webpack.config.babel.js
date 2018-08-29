import path from 'path';
import webpack from 'webpack';

export default function() {
    const entry = {
        'synergy.web': './src/synergy-dom.js',
        'synergy.web.min': './src/synergy-dom.js',
    };

    return {
        entry,

        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js',
            publicPath: '/'
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
                loaders: ['babel-loader'],
            }]
        },

        stats: { colors: true },

        devtool: false
    }
};