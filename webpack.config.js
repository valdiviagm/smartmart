const path = require('path');

// Function that returns a webpack config object based on the given environment
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-source-map',
    optimization: {
      minimize: isProduction
    }
  };
};