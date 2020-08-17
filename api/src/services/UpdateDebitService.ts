import { getCustomRepository } from 'typeorm';
import Debit from '../models/Debit';
import DebitsRepository from '../repositories/DebitsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  id: string;
  reason: string;
  date: Date;
  amount: number;
}

class UpdateDebitService {
  public async execute({
    id,
    reason,
    date,
    amount,
  }: RequestDTO): Promise<Debit> {
    const debitsRepository = getCustomRepository(DebitsRepository);

    const debit = await debitsRepository.findOne(id);

    if (!debit) {
      throw new AppError('Debit does not exists!', 404);
    }

    debit.reason = reason;
    debit.date = date;
    debit.amount = amount;

    await debitsRepository.save(debit);

    return debit;
  }
}

export default UpdateDebitService;
