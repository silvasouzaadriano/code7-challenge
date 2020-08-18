import { Router } from 'express';
import debitsRouter from '@modules/debits/infra/http/routes/debits.routes';

const routes = Router();

routes.use('/debits', debitsRouter);

export default routes;
