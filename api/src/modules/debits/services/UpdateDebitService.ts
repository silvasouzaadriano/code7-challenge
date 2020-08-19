import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

interface Request {
  id: string;
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}

class UpdateDebitService {
  constructor(private debitsRepository: IDebitsRepository) {}

  public async execute({
    id,
    client_id,
    reason,
    date,
    amount,
  }: Request): Promise<Debit> {
    const debit = await this.debitsRepository.update({
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
