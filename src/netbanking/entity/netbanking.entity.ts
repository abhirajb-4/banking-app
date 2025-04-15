import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payee } from '../../payee/entities/payee.entity'

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
  
  @OneToMany(() => Payee, (payee) => payee.user)
  beneficiaries: Payee[];
}
