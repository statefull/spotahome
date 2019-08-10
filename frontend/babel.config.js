module.exports = function(api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [];

  if (process.env['production']) {
    plugins.push('transform-react-remove-prop-types');
  }

  return {
    presets,
    plugins,
  };
};
