import { EntityRepository, Repository } from 'typeorm';
import Debit from '@modules/debits/infra/typeorm/entities/Debit';

@EntityRepository(Debit)
class DebitRepository extends Repository<Debit> {}

export default DebitRepository;
