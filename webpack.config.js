var path = require("path");
var fs = require("fs");
var webpack = require("webpack");

var config = {
    entry: [
        "./src/main.js",
        "bootstrap-loader",
        "babel-polyfill",
        "intl",
        "intl/locale-data/jsonp/en.js"
    ],
    output: {
        path: path.resolve(__dirname, "bin"),
        filename: "[name].js?v=[hash]",
        publicPath: "static/"
    },
    externals: {
        fs: fs
    },
    module:{
        loaders : [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel",
                    query: {
                        presets: ["es2015", "react", "stage-0"]
                    }
                },
                {
                    test: /\.json$/,
                    loader: "json"
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        "style",
                        "css?modules&localIdentName=[name]---[local]---[hash:base64:5]",
                        "sass"
                    ]
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: "url-loader?limit=100000"
                }
        ]
    }
};

if (process.env.NODE_ENV === "production") {
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": "\"production\""
            }
        })
    ];
}

else {
    config.devtool = "source-map";
}

module.exports = config;