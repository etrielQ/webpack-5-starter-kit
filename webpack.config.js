const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const fs = require("fs");

var isProd = process.env.NODE_ENV === "production";

// function generateHtmlPlugins(templateDir) {
//   const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
//   return templateFiles.map((item) => {
//     const parts = item.split(".");
//     const name = parts[0];
//     const extension = parts[1];
//     return new HTMLWebpackPlugin({
//       filename: `${name}.html`,
//       inject: "body",
//       template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
//     });
//   });
// }

// const htmlPlugins = generateHtmlPlugins("./src/template/pages");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  // output: {
  //   filename: "./js/bundle.js",
  //   path: path.resolve(__dirname, "public"),
  //   clean: false,
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProd ? "[name].[hash].js" : "[name].js",
    publicPath: "/dist/",
  },
  devtool: "source-map",
  // devServer: {
  //   liveReload: true,
  //   port: 8080,
  //   hot: false,
  //   open: false,
  // },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({}),
      new CssMinimizerPlugin({
        minimizerOptions: {
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
          preset: ["default"],
        },
        minify: CssMinimizerPlugin.cssoMinify,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "style",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              esModule: false,
            },
          },
          {
            loader: "css-loader",
            options: { sourceMap: false },
          },
          { loader: "postcss-loader", options: { sourceMap: false } },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          // include: path.join(__dirname, "images"),
          filename: "./images/[name][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, "src"),
        use: ["pug-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      ignoreOrder: true,
    }),
    // new HTMLWebpackPlugin({
    //   filename: "./icons/icons-sprite.html",
    //   template: "./src/icons/icons-sprite.pug",
    //   inject: "body",
    // }),
    new HtmlWebpackPlugin({
      template: "./views/layout.pug",
      filename: "layout.pug",
      minify: false,
    }),
    // new webpack.ProvidePlugin({
    // 	$: 'jquery',
    // 	jQuery: 'jquery'
    // }),
    new HtmlWebpackPugPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src/images", to: "images/" }],
      options: {
        concurrency: 100,
      },
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {},
};
