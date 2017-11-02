const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);

const http = require('http');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
// app.get('*', function(req, res) {
//   res.status(200).send({'info': 'success'});
// })

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/api', (request, response) => {
  response.status(200).send({ info: 'success' });
});

server.listen(port);
console.log('server listening on: ', port);

