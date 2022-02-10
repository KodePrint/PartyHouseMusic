const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./static/frontend"),
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: {
        //      '@components': path.resolve(__dirname, 'src/components/'),
        //     // '@containers': path.resolve(__dirname, 'src/containers/'),
        //     // '@pages': path.resolve(__dirname, 'src/pages/'),
        //     // '@styles': path.resolve(__dirname, 'src/styles/'),
        //     // '@icons': path.resolve(__dirname, 'src/assets/icons/'),
        //     // '@logos': path.resolve(__dirname, 'src/assets/logos/'),
        //     // '@hooks': path.resolve(__dirname, 'src/hooks/'),
        // }
    },
    module: {
        rules: [
            {
                test: /\.js|jxs$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
        ],
    },
    optimization: {
        minimize:true,
    },
    plugins: [
        
    ],
}