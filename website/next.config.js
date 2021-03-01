const withTM = require('next-transpile-modules')(['@monorepo/ui']);
const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'source-map',
});
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
} = process.env;
const basePath = '';

module.exports = withSourceMaps(
  withTM({
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      if (
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN &&
        NODE_ENV === 'production'
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.next',
            ignore: ['node_modules'],
            urlPrefix: '~/_next',
            release: option,
          }),
        );
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
    basePath,
    images: {
      domains: ['via.placeholder.com'],
    },
  }),
);
