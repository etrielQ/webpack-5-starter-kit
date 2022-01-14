const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const fs = require("fs")

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map((item) => {
    const parts = item.split(".")
    const name = parts[0]
    const extension = parts[1]
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      inject: "body",
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    })
  })
}

const htmlPlugins = generateHtmlPlugins("./src/template/pages")

module.exports = {
  mode: "development",
  target: "web",
  entry: "./src/js/index.js",
  output: {
    filename: "./js/bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: {
      dry: true,
    },
  },
  devtool: "source-map",
  devServer: {
    liveReload: true,
    port: 8080,
    hot: false,
    open: false,
  },
  optimization: {
    minimize: true,
    minimizer: [
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      ignoreOrder: true,
    }),
    new HTMLWebpackPlugin({
      filename: "./icons/icons-sprite.html",
      template: "./src/icons/icons-sprite.pug",
      inject: "body",
    }),
  ].concat(htmlPlugins),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"],
      },
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
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
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
    ],
  },
  resolve: {},
}
