import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ length: 12 })
  aadharNo: string;

  @Column({ length: 10 })
  panCard: string;

  @Column()
  fathersName: string;

  @Column()
  motherName: string;

  @Column()
  dateOfBirth: string;

  @Column()
  address: string;

  @Column()
  pincode: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  presentAddress: string;

  @Column()
  occupation: string;

  @Column()
  sourceOfIncome: string;

  @Column()
  grossAnnualIncome: string;

  @Column()
  email: string;

  @Column()
  phoneNo: string;

  @Column({ default: false })
  approved: boolean;

  @Column({default:null})
  accountNumber: string;
}
