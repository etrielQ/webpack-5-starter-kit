const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const fs = require("fs");

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HTMLWebpackPlugin({
      filename: `${name}.html`,
      inject: "body",
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

const htmlPlugins = generateHtmlPlugins("./src/template/views");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "./bundle[hash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: false,
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    open: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
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
      filename: "./[name].css",
      ignoreOrder: true,
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./images/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, "src/images"),
    },
  },
};
