module.exports = {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // config.module.rules.push({
    //   test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       name: '[name].[contenthash].[ext]',
    //       limit: 10000,
    //     },
    //   },
    // });

    // let fileLoaderconfig = {
    //   test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
    //   use: {
    //     loader: 'file-loader',
    //     options: {
    //       name: '[name].[contenthash].[ext]',
    //       publicPath: '/hashedImg/',
    //       limit: 10000,
    //     },
    //   },
    // }

    // if (!isServer) {
    //   fileLoaderconfig.use.options = '../public/hashedImg/'
    // }

    // config.module.rules.push(fileLoaderconfig)

    // public 안에 있는 파일들을 다 해시화함.
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: '../public/hashedImg/',
          publicPath: '/hashedImg/',
          limit: 10000,
        },
      },
    });
    return config;
  },
};
