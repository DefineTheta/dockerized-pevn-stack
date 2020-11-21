// To gzip compress assets in production build
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

module.exports = {
  outputDir: "./www/dist",
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        minRatio: 0.8,
      }),
    ],
  },
};
