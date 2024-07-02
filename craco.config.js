const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: true,
              mangle: true,
            },
          }),
          new CssMinimizerPlugin(),
        ],
      };

      webpackConfig.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1,
        })
      );

      return webpackConfig;
    },
  },
};
