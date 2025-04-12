import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NetBanking } from './entity/netbanking.entity';
import { RegisterNetBankingDto } from './dto/register-netbanking.dto';
import { Account } from 'src/account/entity/account.entity';
import * as bcrypt from 'bcrypt';
import { AccountService } from 'src/account/account.service';


@Injectable()
export class NetbankingService {
  constructor(
    @InjectRepository(NetBanking) private netRepo: Repository<NetBanking>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    private accountService: AccountService
  ) {}

  async register(dto: RegisterNetBankingDto) {
    const account = await this.accountRepo.findOne({
      where: { accountNumber: dto.accountNumber },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }
    //set the account netbanking status true and update in database
    
    const existingNetBanking = await this.netRepo.findOne({
      where: { accountNumber: dto.accountNumber },
    });
    //throw exception if account number already exists
    if (existingNetBanking) {
      throw new NotFoundException('Account number already exists');
    }
    
    const hashedLoginPassword = await bcrypt.hash(dto.loginPassword, 10);
    const hashedTransactionPassword = await bcrypt.hash(dto.transactionPassword, 10);
  
    const netBanking = this.netRepo.create({
      accountNumber: dto.accountNumber,
      loginPassword: hashedLoginPassword,
      transactionPassword: hashedTransactionPassword,
    });
    
    const result = await this.netRepo.save(netBanking);
    
    // Update account's net banking status
    await this.accountService.setNetBankingStatus(dto.accountNumber);
    
    return result;
  }
}
