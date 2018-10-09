import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import webpackDevMiddleWare from 'webpack-dev-middleware';

import webpackConfig from '../webpack.config.babel';
import '../config/database';

const app = express();
// const indexPath = path.join(__dirname, '../dist', 'index.html');
const compiler = webpack(webpackConfig);

// app.use(express.static('./dist'));

// app.use(webpackDevMiddleWare(compiler, {
//   noInfo: true,
//   writeToDisk: true,
//   publicPath: webpackConfig.output.publicPath,
// }));

// app.use(webpackHotMiddleWare(compiler));

// app.get('*', (_, res) => { res.sendFile(indexPath); });

// app.listen({ port: '4000' }, () =>
//   console.log('🚀 Server ready at http://localhost:4000')
// )


const serverOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

app.use(express.static('./dist'));

app.use(webpackDevMiddleWare(compiler, serverOptions));
app.use(webpackHotMiddleWare(compiler, serverOptions));

app.listen({ port: '5000' }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('Webpack development server listening on port 5000');
  }
});
