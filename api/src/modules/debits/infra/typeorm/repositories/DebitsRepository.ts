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
    client_name,
    reason,
    date,
    amount,
  }: ICreateDebitDTO): Promise<Debit> {
    const debit = this.ormRepository.create({
      client_id,
      client_name,
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
    client_name,
    reason,
    date,
    amount,
  }: IUpdateDebitDTO): Promise<Debit> {
    const debit = await this.ormRepository.findOne(id);

    if (!debit) {
      throw new AppError('Dívida não existe!', 404);
    }

    debit.client_id = client_id;
    debit.client_name = client_name;
    debit.reason = reason;
    debit.date = date;
    debit.amount = amount;

    await this.ormRepository.save(debit);

    return debit;
  }

  public async delete({ id, client_id }: IDeleteDebitDTO): Promise<Debit> {
    if (client_id) {
      const debit = await this.ormRepository.findOne({
        where: {
          client_id,
        },
      });

      if (!debit) {
        throw new AppError('Cliente não existe!', 404);
      }

      await this.ormRepository.delete({
        client_id,
      });

      return debit;
    }

    const debit = await this.ormRepository.findOne(id);

    if (!debit) {
      throw new AppError('Dívida não existe!', 404);
    }

    await this.ormRepository.delete(id);

    return debit;
  }

  public async findAll(
    client_id: string | undefined,
  ): Promise<Debit[] | undefined> {
    if (client_id !== 'undefined') {
      const debits = await this.ormRepository
        .createQueryBuilder('debit')
        .select('debit.client_id', 'client_id')
        .addSelect('debit.client_name', 'client_name')
        .addSelect('SUM(debit.amount)', 'total_debits')
        .where('debit.client_id = :clientId', { clientId: Number(client_id) })
        .groupBy('debit.client_id')
        .addGroupBy('debit.client_name')
        .addOrderBy('debit.client_name')
        .getRawMany();
      return debits;
    }
    const debits = await this.ormRepository
      .createQueryBuilder('debit')
      .select('debit.client_id', 'client_id')
      .addSelect('debit.client_name', 'client_name')
      .addSelect('SUM(debit.amount)', 'total_debits')
      .groupBy('debit.client_id')
      .addGroupBy('debit.client_name')
      .addOrderBy('debit.client_name')
      .getRawMany();

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
