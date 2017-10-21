import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

userRoutes('/api/v1', app);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome here to my world!'
  });
});

app.listen(process.env.PORT);
