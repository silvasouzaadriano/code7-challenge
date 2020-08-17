import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Debit;
