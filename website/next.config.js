const withTM = require('next-transpile-modules')(['@monorepo/ui']);
const withSourceMaps = require('@zeit/next-source-maps');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;
const basePath = '';

module.exports = withSourceMaps(
  withTM({
    env: {
      NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
    },
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      if (
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN &&
        COMMIT_SHA &&
        NODE_ENV === 'production'
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.next',
            ignore: ['node_modules'],
            urlPrefix: '~/_next',
            release: COMMIT_SHA,
            deploy: {
              env: 'production',
            },
          }),
        );
      }

      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NEXT_IS_SERVER': JSON.stringify(isServer.toString()),
        }),
      );

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
