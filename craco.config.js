// craco.config.js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
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
        }),
        new CompressionPlugin({
          test: /\.(js|css)$/,
          filename: '[path][base].gz',
        })
      );

      return webpackConfig;
    },
  },
};

