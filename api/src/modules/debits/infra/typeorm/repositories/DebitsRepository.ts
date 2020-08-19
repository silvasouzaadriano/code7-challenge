import { getRepository, Repository } from 'typeorm';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import ICreateDebitDTO from '@modules/debits/dtos/ICreateDebitDTO';
import IUpdateDebitDTO from '@modules/debits/dtos/IUpdateDebitDTO';
import IDeleteDebitDTO from '@modules/debits/dtos/IDeleteDebitDTO';

import Debit from '@modules/debits/infra/typeorm/entities/Debit';
import AppError from '@shared/errors/AppError';

class DebitRepository implements IDebitsRepository {
  private ormRepository: Repository<Debit>;

  constructor() {
    this.ormRepository = getRepository(Debit);
  }

  public async create({
    client_id,
    reason,
    date,
    amount,
  }: ICreateDebitDTO): Promise<Debit> {
    const debit = this.ormRepository.create({
      client_id,
      reason,
      date,
      amount,
    });

    await this.ormRepository.save(debit);

    return debit;
  }

  public async update({
    id,
    client_id,
    reason,
    date,
    amount,
  }: IUpdateDebitDTO): Promise<Debit> {
    const debit = await this.ormRepository.findOne(id);

    if (!debit) {
      throw new AppError('Debit does not exists!', 404);
    }

    debit.client_id = client_id;
    debit.reason = reason;
    debit.date = date;
    debit.amount = amount;

    await this.ormRepository.save(debit);

    return debit;
  }

  public async delete({ id }: IDeleteDebitDTO): Promise<Debit> {
    const debit = await this.ormRepository.findOne(id);

    if (!debit) {
      throw new AppError('Debit does not exists!', 404);
    }

    await this.ormRepository.delete(id);

    return debit;
  }

  public async findAll(): Promise<Debit[] | undefined> {
    const debits = await this.ormRepository.find();

    /* const debits = await this.ormRepository
      .createQueryBuilder('debits')
      .select('sum(debits.amount)', 'debits.client_id')
      .groupBy('debits.client_id'); */

    return debits;
  }

  public async findByClient(client_id: number): Promise<Debit[] | undefined> {
    const debits = await this.ormRepository.find({
      where: {
        client_id,
      },
    });

    return debits;
  }
}

export default DebitRepository;
