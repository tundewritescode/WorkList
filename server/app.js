import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import fileUpload from 'express-fileupload';

import './config/database';

import userRoutes from './routes/userRoutes';
import toDoRoutes from './routes/toDoRoutes';
import taskRoutes from './routes/taskRoutes';
import collaboratorRoutes from './routes/collaboratorRoutes';
import fileRoutes from './routes/fileRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(fileUpload());

userRoutes('/api/v1', app);
toDoRoutes('/api/v1', app);
taskRoutes('/api/v1', app);
fileRoutes('/api/v1', app);
collaboratorRoutes('/api/v1', app);

app.listen(process.env.PORT);
