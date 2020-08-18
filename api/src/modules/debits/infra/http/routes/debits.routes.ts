import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import DebitsRepository from '@modules/debits/infra/typeorm/repositories/DebitsRepository';
import CreateDebitService from '@modules/debits/services/CreateDebitService';
import UpdateDebitService from '@modules/debits/services/UpdateDebitService';

const debitsRouter = Router();

debitsRouter.get('/', async (request, response) => {
  const debitsRepository = getCustomRepository(DebitsRepository);
  const debits = await debitsRepository.find();

  return response.json(debits);
});

debitsRouter.post('/', async (request, response) => {
  const { client_id, reason, date, amount } = request.body;

  const createDebit = new CreateDebitService();

  const debit = await createDebit.execute({
    client_id,
    reason,
    date,
    amount,
  });

  return response.json(debit);
});

debitsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { reason, date, amount } = request.body;

  const updateDebit = new UpdateDebitService();

  const debit = await updateDebit.execute({
    id,
    reason,
    date,
    amount,
  });

  return response.json(debit);
});

export default debitsRouter;
