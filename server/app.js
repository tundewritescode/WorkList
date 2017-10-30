import path from 'path';
import webpack from 'webpack';
import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import expressValidator from 'express-validator';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import './config/database';
import config from './../webpack.config';

import userRoutes from './routes/userRoutes';
import toDoRoutes from './routes/toDoRoutes';
import taskRoutes from './routes/taskRoutes';
import fileRoutes from './routes/fileRoutes';
import collaboratorRoutes from './routes/collaboratorRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static('client/assets'));
app.use(fileUpload());

userRoutes('/api/v1', app);
toDoRoutes('/api/v1', app);
taskRoutes('/api/v1', app);
fileRoutes('/api/v1', app);
collaboratorRoutes('/api/v1', app);

const compiler = webpack(config);
const DIST_DIR = path.join(__dirname, 'dist');
const isDevelopment = process.env.NODE_ENV !== 'production';
const HTML_FILE = path.join(__dirname, 'dist/client/index.html');

if (isDevelopment) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));

  app.get('*', (request, response, next) => {
    const filename = path.join(DIST_DIR, 'client', 'index.html');

    compiler.outputFileSystem.readFile(filename, (error, result) => {
      if (error) {
        next(error);
      }
      response.set('content-type', 'text/html');
      response.send(result);
      response.end();
    });
  });
} else {
  app.get('*', (request, response) => response.sendFile(HTML_FILE));
}

app.listen(process.env.PORT);

export default app;
