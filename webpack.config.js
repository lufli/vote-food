module.exports = {
  devtool: 'eval-source-map',
  entry: `${__dirname}/app/index.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    }],
  },
  devServer: {
    host: '127.0.0.1',
    port: '8080',
    contentBase: './public',
    historyApiFallback: true,
  },
};
