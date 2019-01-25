//const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var path = require("path");

module.exports = {
    entry: {
        app: ['./assets/js/app.js', './assets/scss/admin.scss', './assets/scss/main.scss'],
        editor: ['./assets/js/editor.js'],
        addMedia: ['./assets/js/addMedia.js'],
        login: ['./assets/js/login.js']
    },

    mode: 'production',//change to 'development' for non minified js
    output: {
        path: path.resolve(__dirname, "static/assets"),
        filename: '[name].js',
        publicPath: "/static"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].css',
                            context: './',
                            outputPath: '/',
                            publicPath: '/dist'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ],
    },
};