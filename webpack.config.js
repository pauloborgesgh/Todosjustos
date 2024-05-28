const webpack = require('webpack');

module.exports = {
  // ... outras configurações ...
  devServer: {
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
