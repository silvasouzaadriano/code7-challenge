import Debit from '../models/Debit';
import DebitsRepository from '../repositories/DebitsRepository';

interface RequestDTO {
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}

class CreateDebitService {
  private debitsRepository: DebitsRepository;

  constructor(debitsRepository: DebitsRepository) {
    this.debitsRepository = debitsRepository;
  }

  public execute({ client_id, reason, date, amount }: RequestDTO): Debit {
    const debit = this.debitsRepository.create({
      client_id,
      reason,
      date,
      amount,
    });

    return debit;
  }
}

export default CreateDebitService;
