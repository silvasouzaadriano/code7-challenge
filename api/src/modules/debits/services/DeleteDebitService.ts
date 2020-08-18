import { getCustomRepository } from 'typeorm';
import DebitsRepository from '../infra/typeorm/repositories/DebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

interface IRequest {
  id: string;
}

class DeleteDebitService {
  public async execute({ id }: IRequest): Promise<Debit> {
    const debitsRepository = getCustomRepository(DebitsRepository);

    const debit = await debitsRepository.delete({
      id,
    });

    return debit;
  }
}

export default DeleteDebitService;
