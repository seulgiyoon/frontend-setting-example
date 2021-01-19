module.exports = {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // file-loader는 프로젝트에 사용되는 파일들을 모두 복사한다. public 안에 있는 파일도 모두.
    // 서버와 브라우저 각각 한번씩 실행되므로 복사된 파일은 각각의 폴더에 존재하게 된다.

    // 빌드하거나 배포해보면 해당 파일들은 웹상에서는 보이지 않는다. static 폴더만 보인다.
    // 브라우저 혹은 서버측 하나에서만 파일 로더를 돌게 하면 이미지를 required로 가져온 부분에서 파싱 에러가 난다.

    // Module parse failed: Unexpected character '�' (1:0)
    // You may need an appropriate loader to handle this file type,
    // currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
    // (Source code omitted for this binary file)

    // 서버에 생기는 파일들은 완전히 지워지고 다시 생겨서, 예전에 생성된 파일이 남아있지 않다.
    // 하지만 public/hashedImg에는 예전에 생성된, 바뀌기 전 파일도 남아있다. 이걸 지울 수 없을까?
    // -> 파일 뒤에 ?를 붙이고 해싱을 붙이면, 파일 자체는 다른 파일로 인식되면서도 파일명은 같은 파일명으로 가져갈 수 있다.

    // 만약 브라우저의 public/images 폴더에 그냥 빌드한 이미지를 넣으면, dev에서는 파일의 변화가 있다고 감지하고 무한 핫로딩에 빠진다.
    // 그래서 프로덕션에서만 같은 폴더에 파일이 들어가도록(덮어씌워지도록) 설정함
    // 사실 이게 어떤 의미가 있는지는 정확하게 모르겠다.

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          // '[이름].[확장자]?[해시(파일이 변경된 경우에만 변경됨)] 형태로 파일 이름을 설정한다
          name: '[name].[ext]?[contenthash]',
          // 빌드된 파일이 저장될 경로
          outputPath: dev ? '../public/hashedImages/' : '../public/images/',
          // 경로 앞에 붙을 경로. 설정하지 않으면 _next/부터 시작한다.
          publicPath: dev ? '/hashedImages/' : '/images/',
          // 10kb 파일까지는 base64로 인코딩해서 인라인으로 삽입한다.
          // 이 크기 이상 넘어가는 파일은 file-loader가 처리한다.
          limit: 10000,
        },
      },
    });

    return config;
  },
};
