module.exports = {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // file-loader는 프로젝트에 사용되는 파일들을 모두 복사한다. public 안에 있는 파일도 모두.
    // 서버와 브라우저 각각 한번씩 실행되므로 복사된 파일은 각각의 폴더에 존재하게 된다.
    
    // 빌드하거나 배포해보면 해당 파일들은 웹상에서는 보이지 않는다. static 폴더만 보인다.
    // 브라우저에서는 파일이 복사되지 않게 해보려 했으나 실패했다. 파일을 복사하는게 파일 로더의 일이므로..
    // 브라우저에서 파일 로더 자체를 돌지 않게 하면 이미지를 required로 가져온 부분에서 파싱 에러가 난다.

    // Module parse failed: Unexpected character '�' (1:0)
    // You may need an appropriate loader to handle this file type,
    // currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
    // (Source code omitted for this binary file)

    // 서버에 생기는 파일들은 완전히 지워지고 다시 생겨서, 예전에 생성된 파일이 남아있지 않다.
    // 하지만 public/hashedImg에는 예전에 생성된, 바뀌기 전 파일도 남아있다. 사실 이 폴더는 없어도 상관이 없다.
    // 만약 브라우저의 public/images 폴더에 그냥 빌드한 이미지를 넣으면, dev에서는 파일의 변화가 있다고 감지하고 무한 핫로딩에 빠진다.

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          // 이름.해시(파일이 변경된 경우에만 변경됨).확장자 형태로 파일 이름을 설정한다
          name: isServer ? '[name].[contenthash].[ext]' : '[name].[ext]',
          // 빌드된 파일이 저장될 경로
          outputPath: !dev ? '../public/images/' : '../public/hashedImages/',
          // 경로 앞에 붙을 경로. 설정하지 않으면 _next/부터 시작한다.
          publicPath: !dev ? '/hashedImages/' : '/images/',
        },
      },
    });

    // config.module.rules.push({
    //   test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
    //   use: {
    //     loader: 'file-loader',
    //     options: {
    //       // 이름.해시(파일이 변경된 경우에만 변경됨).확장자 형태로 파일 이름을 설정한다
    //       name: '[name].[contenthash].[ext]',
    //       // 빌드된 파일이 저장될 경로
    //       outputPath: '../public/hashedImages/',
    //       // 경로 앞에 붙을 경로. 설정하지 않으면 _next/부터 시작한다.
    //       publicPath: '/hashedImages/',
    //     },
    //   },
    // });

    return config;
  },
};
