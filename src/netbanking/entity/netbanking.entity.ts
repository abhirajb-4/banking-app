import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NetBanking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  accountNumber: string;

  @Column()
  loginPassword: string;

  @Column()
  transactionPassword: string;

  @Column({ default: 0 })
  incorretLoginAttempts:number
}
