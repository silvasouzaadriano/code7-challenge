import { Router } from 'express';
import debitsRouter from './debits.routes';

const routes = Router();

routes.use('/debits', debitsRouter);

export default routes;
