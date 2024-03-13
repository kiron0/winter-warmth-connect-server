/* eslint-disable no-undef */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import * as path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs')

// Set the path to the views directory
app.set('views', path.join(__dirname, '../views'))

// application routes
app.use('/api/v1', router);

// Welcome route
app.get('/', async (req: Request, res: Response) => {
          res.render('welcome')
})

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;