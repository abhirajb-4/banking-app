import { NetBanking } from 'src/netbanking/entity/netbanking.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Payee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  accountNumber: string;

  @Column()
  bankName: string;

  @Column()
  ifscCode: string;

  @ManyToOne(() => NetBanking, (netbanking) => netbanking.beneficiaries, { onDelete: 'CASCADE' })
  user: NetBanking;
}
