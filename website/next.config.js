const withTM = require('next-transpile-modules')(['@monorepo/ui']);

module.exports = withTM({
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: '../public/hashedImages/',
          publicPath: '/hashedImages/',
          limit: 4000,
        },
      },
    });

    return config;
  },
});