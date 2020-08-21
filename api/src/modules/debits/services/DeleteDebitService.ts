import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

interface IRequest {
  id: string;
  client_id: number;
}

class DeleteDebitService {
  constructor(private debitsRepository: IDebitsRepository) {}

  public async execute({ id, client_id }: IRequest): Promise<Debit> {
    const debit = await this.debitsRepository.delete({
      id,
      client_id,
    });

    return debit;
  }
}

export default DeleteDebitService;
