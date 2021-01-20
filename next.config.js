module.exports = {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // file-loader는 프로젝트에 사용되는 파일들을 모두 복사한다. public 안에 있는 파일도 모두.
    // 서버와 브라우저 각각 한번씩 실행되므로 복사된 파일은 각각의 폴더에 존재하게 된다.
    // url-loader는 설정한 용량 이하 파일은 base64로 인코딩해서 인라인으로 삽입한다.
    // 그보다 큰 파일은 file-loader가 처리한다.

    // 빌드하거나 배포해보면 해당 파일들은 웹상에서는 보이지 않는다. static 폴더만 보인다.
    // 브라우저 혹은 서버측 하나에서만 파일 로더를 돌게 하면 이미지를 required로 가져온 부분에서 파싱 에러가 난다.

    // Module parse failed: Unexpected character '�' (1:0)
    // You may need an appropriate loader to handle this file type,
    // currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
    // (Source code omitted for this binary file)

    // 서버에 생기는 파일들은 완전히 지워지고 다시 생겨서, 예전에 생성된 파일이 남아있지 않다.
    // 하지만 public/hashedImg에는 예전에 생성된, 바뀌기 전 파일도 남아있다. 이걸 지울 수 없을까?
    // -> 파일 뒤에 ?를 붙이고 해싱을 붙이면, 파일 자체는 다른 파일로 인식되면서도 파일명은 같은 파일명으로 가져갈 수 있다.
    // -> 하지만 ? 뒷부분이 쿼리 스트링으로 취급될 수 있으므로 [이름].[해시].[확장자]로 설정한다.

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          // '[이름].[해시(파일이 변경되었을 때만 변경됨)].[확장자] 형태로 파일 이름을 설정한다
          name: '[name].[contenthash].[ext]',
          // 빌드된 파일이 저장될 경로
          // outputPath: dev ? '../public/hashedImages/' : '../public/images/',
          outputPath: '../public/hashedImages/',
          // 경로 앞에 붙을 경로. 설정하지 않으면 _next/부터 시작한다.
          // publicPath: dev ? '/hashedImages/' : '/images/',
          publicPath: '/hashedImages/',
          // 10kb 파일까지는 base64로 인코딩해서 인라인으로 삽입한다.
          // 이 크기 이상 넘어가는 파일은 file-loader가 처리한다.
          limit: 10000,
        },
      },
    });

    return config;
  },
};
