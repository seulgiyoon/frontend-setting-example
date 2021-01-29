module.exports = function (api) {
  // api.cache(true)

  const presets = ['next/babel'];

  const plugins = [['babel-plugin-styled-components', { ssr: true }]];

  return {
    presets,
    plugins,
  };
};
