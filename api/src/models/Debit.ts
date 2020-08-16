import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('debits')
class Debit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  client_id: number;

  @Column()
  reason: string;

  @Column('time with time zone')
  date: Date;

  @Column('numeric')
  amount: number;
}

export default Debit;
