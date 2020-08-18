import { getCustomRepository } from 'typeorm';
import DebitsRepository from '../infra/typeorm/repositories/DebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

interface RequestDTO {
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}

class CreateDebitService {
  // constructor(private debitsRepository: IDebitsRepository) {}

  public async execute({
    client_id,
    reason,
    date,
    amount,
  }: RequestDTO): Promise<Debit> {
    const debitsRepository = getCustomRepository(DebitsRepository);

    // const debit = await this.debitsRepository.create({
    const debit = await debitsRepository.create({
      client_id,
      reason,
      date,
      amount,
    });

    return debit;
  }
}

export default CreateDebitService;
