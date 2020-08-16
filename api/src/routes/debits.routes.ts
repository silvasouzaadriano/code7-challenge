import { Router } from 'express';

// import Debit from '../models/Debit';
import DebitsRepository from '../repositories/DebitsRepository';
import CreateDebitService from '../services/CreateDebitService';

const debitsRouter = Router();
const debitsRepository = new DebitsRepository();

debitsRouter.get('/', (request, response) => {
  const debits = debitsRepository.all();

  return response.json(debits);
});

debitsRouter.post('/', (request, response) => {
  try {
    const { client_id, reason, date, amount } = request.body;

    const createDebit = new CreateDebitService(debitsRepository);

    const debit = createDebit.execute({ client_id, reason, date, amount });

    return response.json(debit);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default debitsRouter;
