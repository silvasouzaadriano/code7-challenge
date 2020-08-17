import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

// import Debit from '../models/Debit';
import DebitsRepository from '../repositories/DebitsRepository';
import CreateDebitService from '../services/CreateDebitService';

const debitsRouter = Router();

debitsRouter.get('/', async (request, response) => {
  const debitsRepository = getCustomRepository(DebitsRepository);
  const debits = await debitsRepository.find();

  return response.json(debits);
});

debitsRouter.post('/', async (request, response) => {
  try {
    const { client_id, reason, date, amount } = request.body;

    const createDebit = new CreateDebitService();

    const debit = await createDebit.execute({
      client_id,
      reason,
      date,
      amount,
    });

    return response.json(debit);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default debitsRouter;
