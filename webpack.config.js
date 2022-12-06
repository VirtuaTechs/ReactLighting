require("dotenv").config({});
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  return {
    entry: ["./src/index.ts"],
    module: {
      rules: [
        {
          test: /\.js$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.ts$/i,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    resolve: {
      extensions: [".ts", ".js"],
      fallback: {
        "fs": false,
        "crypto": false
      }
    },
    output: {
      path: `${__dirname}/public`,
      publicPath: "/",
      filename: "index.js",
      libraryTarget: "window",
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: "src/favicon.ico",
        template: "src/index.html",
        inject: false,
      }),
      new MiniCssExtractPlugin({
        filename: "css/style.css",
      }),
      new CopyPlugin({
        patterns: [
          { from: "src/models", to: "models" },
        ],
      }),
      new webpack.DefinePlugin({
        "process.env.REACT_APP_AUTH0_DOMAIN": JSON.stringify(
          process.env.REACT_APP_AUTH0_DOMAIN
        ),
        "process.env.REACT_APP_AUTH0_CLIENT_ID": JSON.stringify(
          process.env.REACT_APP_AUTH0_CLIENT_ID
        ),
        "process.env.REACT_APP_AUTH0_AUDIENCE": JSON.stringify(
          process.env.REACT_APP_AUTH0_AUDIENCE
        ),
        "process.env.REACT_APP_API_ENDPOINT": JSON.stringify(
          process.env.REACT_APP_API_ENDPOINT
        ),
        "process.env.REACT_APP_API_KEY": JSON.stringify(
          process.env.REACT_APP_API_KEY
        ),
        "process.env.REACT_APP_IMAGE_DOMAIN": JSON.stringify(
          process.env.REACT_APP_IMAGE_DOMAIN
        ),
        "process.env.REACT_APP_IMAGE_CACHE_URL": JSON.stringify(
          process.env.REACT_APP_IMAGE_CACHE_URL
        ),
      }),
    ],
    devtool: "source-map",
    devServer: {
      liveReload: true,
      host: "0.0.0.0",
      port: 3000,
      hot: true,
      onListening: (devServer) => {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }
        const port = devServer.server.address().port;
        console.log("\x1b[33m<i>", "[Vieweet Test Env]", env);
        console.log(
          "\x1b[33m<i>",
          "[Vieweet Test Page]",
          `http://localhost:${port}/?mode=edit&imageEnv=prod&tour=23062730-0BB2-42E0-A935-87FADC39E69B`
        );
      },
    },
    externals: {},
  };
};
