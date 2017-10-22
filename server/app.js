import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import './config/database';

import userRoutes from './routes/userRoutes';
import toDoRoutes from './routes/toDoRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

userRoutes('/api/v1', app);
toDoRoutes('/api/v1', app);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome here to my world!'
  });
});

app.listen(process.env.PORT);
