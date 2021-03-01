const withTM = require('next-transpile-modules')(['@monorepo/ui']);
const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'source-map',
});

module.exports = withSourceMaps(
  withTM({
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

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

      config.module.rules.push({
        test: /\.tsx?|\.ts?$/,
        use: [defaultLoaders.babel],
      });

      return config;
    },
    images: {
      domains: ['via.placeholder.com'],
    },
  }),
);
