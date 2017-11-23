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
import reminderRoutes from './routes/reminderRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, '../client/assets')));
app.use(express.static(path.join('dist')));
app.use(fileUpload());

app.get('/AtriggerVerify.txt', (req, res) => res.sendFile(path.join(__dirname, '../ATriggerVerify.txt')));

userRoutes('/api/v1', app);
toDoRoutes('/api/v1', app);
taskRoutes('/api/v1', app);
fileRoutes('/api/v1', app);
reminderRoutes('/api/v1', app);
collaboratorRoutes('/api/v1', app);

const isDevelopment = process.env.NODE_ENV !== 'production';
const HTML_FILE = path.join(__dirname, '../dist/index.html');

if (isDevelopment) {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: '/',
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './../client/index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, '../client')));

  app.get('*', (request, response) => response.sendFile(HTML_FILE));
}

app.listen(process.env.PORT);

export default app;
