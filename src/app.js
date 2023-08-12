import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';

import apiRouter from './router/api.js';

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use('/api', apiRouter);

export default app;