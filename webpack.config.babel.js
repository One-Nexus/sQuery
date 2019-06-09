import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default function() {
    const entry = {
        'squery': './src/index.js',
        'squery.min': './src/index.js',
    };

    return {
        entry,

        output: {
            path: path.resolve(__dirname, 'dist/'),
            globalObject: 'typeof self !== \'undefined\' ? self : this',
            filename: '[name].js',
            publicPath: '/',
            libraryTarget: 'umd'
        },

        mode: 'production',

        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    include: /\.min\.js$/,
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ]
        },

        module: {
            rules: [{
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },

        node: {
            process: false,
            Buffer: false
        }
    }
};