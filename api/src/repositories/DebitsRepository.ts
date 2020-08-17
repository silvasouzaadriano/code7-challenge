import { EntityRepository, Repository } from 'typeorm';
import Debit from '../models/Debit';

@EntityRepository(Debit)
class DebitRepository extends Repository<Debit> {
  /* public async findbyClientId(client_id: number): Promise<Debit | null> {
    const debits = await this.findOne({
      where: { client_id },
    });

    return debits || null;
  } */
}

export default DebitRepository;
