import { getCustomRepository } from 'typeorm';
import DebitsRepository from '../infra/typeorm/repositories/DebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

interface RequestDTO {
  id: string;
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}

class UpdateDebitService {
  public async execute({
    id,
    client_id,
    reason,
    date,
    amount,
  }: RequestDTO): Promise<Debit> {
    const debitsRepository = getCustomRepository(DebitsRepository);

    const debit = await debitsRepository.update({
      id,
      client_id,
      reason,
      date,
      amount,
    });

    return debit;
  }
}

export default UpdateDebitService;
