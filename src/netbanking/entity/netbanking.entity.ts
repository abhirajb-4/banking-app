import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NetBanking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  accountNumber: string;

  @Column({unique:true})
  email: string;

  @Column({ type: 'varchar', nullable: true })
  otp: string | null;
  
  @Column({ type: 'timestamp', nullable: true })
  otpExpiry: Date | null;
  
  @Column()
  loginPassword: string;

  @Column()
  transactionPassword: string;

  @Column({ default: 0 })
  incorretLoginAttempts:number
}
