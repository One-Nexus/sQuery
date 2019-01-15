import path from 'path';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

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
            libraryTarget: 'umd',
            globalObject: 'typeof self !== "undefined" ? self : this',
        },

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
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }]
        },

        node: { Buffer: false },

        stats: { colors: true },

        devtool: false
    }
};