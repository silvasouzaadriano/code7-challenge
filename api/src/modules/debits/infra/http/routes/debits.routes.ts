import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import DebitsRepository from '@modules/debits/infra/typeorm/repositories/DebitsRepository';
import CreateDebitService from '@modules/debits/services/CreateDebitService';
import UpdateDebitService from '@modules/debits/services/UpdateDebitService';
import DeleteDebitService from '@modules/debits/services/DeleteDebitService';

const debitsRouter = Router();
// const debitsRepository = new DebitsRepository();

debitsRouter.get('/', async (request, response) => {
  const debitsRepository = getCustomRepository(DebitsRepository);
  const debits = await debitsRepository.findAll();

  return response.json(debits);
});

debitsRouter.get('/:client_id', async (request, response) => {
  const { client_id }: number = request.params;
  const debitsRepository = getCustomRepository(DebitsRepository);
  const debits = await debitsRepository.findByClient(client_id);

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
  const { client_id, reason, date, amount } = request.body;

  const updateDebit = new UpdateDebitService();

  const debit = await updateDebit.execute({
    id,
    client_id,
    reason,
    date,
    amount,
  });

  return response.json(debit);
});

debitsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteDebit = new DeleteDebitService();

  const debit = await deleteDebit.execute({
    id,
  });

  return response.json(debit);
});

export default debitsRouter;
