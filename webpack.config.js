const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/manifest.json', to: 'manifest.json' },
          { from: 'src/background.js', to: 'background.js' },
          { from: 'src/setup.js', to: 'setup.js' },
          // Adding asset copying
          { from: 'assets/icon128.png', to: 'icon128.png' },
          { from: 'assets/icon16.png', to: 'icon16.png' },
          { from: 'assets/icon48.png', to: 'icon48.png' }
        ]
      })
    ],
    devtool: isProduction ? 'cheap-module-source-map' : 'cheap-module-source-map',
    optimization: {
      minimize: isProduction
    }
  };
};