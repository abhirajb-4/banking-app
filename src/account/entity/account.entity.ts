// src/account/account.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  accountNumber: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  userId: number;

  @Column({ default: 'savings' })
  accountType: string;

  @Column({ default: 0.0 })
  balance: number;

  // @Column({ default: false })
  // netBankingStatus: boolean;
}
