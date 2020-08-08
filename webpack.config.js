const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключите плагин
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: { main: "./src/scripts/index.js" },
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
        test: /\.(png|svg|jpg|gif|woff2)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: "file-loader",
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
      template: "./src/pages/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
