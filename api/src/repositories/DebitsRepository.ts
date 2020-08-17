import { EntityRepository, Repository } from 'typeorm';
import Debit from '../models/Debit';

@EntityRepository(Debit)
class DebitRepository extends Repository<Debit> {}

export default DebitRepository;
