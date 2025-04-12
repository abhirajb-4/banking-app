// src/account/account.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entity/account.entity';
import { CreateAccountDto } from './dto/account.dto';


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createAccount(dto: CreateAccountDto): Promise<Account> {
    // Check if account already exists for this user
    const existingAccount = await this.accountRepository.findOne({ 
      where: { userId: dto.userId } 
    });
    if (existingAccount) {
      throw new ConflictException('User already has an account');
    }

    // Generate unique account number
    let accountNumber: string ="";
    let isUnique = false;
    
    // Ensure account number is unique (extremely unlikely to collide, but good practice)
    while (!isUnique) {
      accountNumber = this.generateAccountNumber();
      const existing = await this.accountRepository.findOne({ 
        where: { accountNumber } 
      });
      isUnique = !existing;
    }

    const account = this.accountRepository.create({
    accountNumber:accountNumber,
      email: dto.email,
      userId: dto.userId,
      createdAt: new Date(),
    });

    return this.accountRepository.save(account);
  }

  //GENERATE ACCOUNT NUMBER
  private generateAccountNumber(): string {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }
}