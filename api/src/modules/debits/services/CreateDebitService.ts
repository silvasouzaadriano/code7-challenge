import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

interface Request {
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}

class CreateDebitService {
  constructor(private debitsRepository: IDebitsRepository) {}

  public async execute({
    client_id,
    reason,
    date,
    amount,
  }: Request): Promise<Debit> {
    const debit = await this.debitsRepository.create({
      client_id,
      reason,
      date,
      amount,
    });

    return debit;
  }
}

export default CreateDebitService;
