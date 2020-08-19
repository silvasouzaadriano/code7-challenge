import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

interface IRequest {
  id: string;
}

class DeleteDebitService {
  constructor(private debitsRepository: IDebitsRepository) {}

  public async execute({ id }: IRequest): Promise<Debit> {
    const debit = await this.debitsRepository.delete({
      id,
    });

    return debit;
  }
}

export default DeleteDebitService;
