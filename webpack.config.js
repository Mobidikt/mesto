const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: { main: "./src/pages/index.js" },
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями

        // при обработке этих файлов нужно использовать file-loader
        test: /.(png|svg|jpg|gif)$/,
        loader: "file-loader?name=./images/[name].[ext]",
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /.(eot|ttf|woff|woff2)$/,
        loader: "file-loader?name=./vendor/[name].[ext]",
      },
      // аналогично добавьте правило для работы с html
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
