import { EntityRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import Debit from '../models/Debit';

interface CreateAppointmentDTO {
  client_id: number;
  reason: string;
  date: Date;
  amount: number;
}

// @EntityRepository(Debit)
// class DebitRepository extends Repository<Debit> {

class DebitRepository {
  private debits: Debit[];

  constructor() {
    this.debits = [];
  }

  public all(): Debit[] {
    return this.debits;
  }

  public create({
    client_id,
    reason,
    date,
    amount,
  }: CreateAppointmentDTO): Debit {
    const id = uuid();
    const debit = new Debit(id, client_id, reason, date, amount);

    this.debits.push(debit);

    return debit;
  }
}

export default DebitRepository;
