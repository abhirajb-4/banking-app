import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NetBanking } from './entity/netbanking.entity';
import { RegisterNetBankingDto } from './dto/register-netbanking.dto';
import { Account } from 'src/account/entity/account.entity';
import * as bcrypt from 'bcrypt';
import { AccountService } from 'src/account/account.service';
import { NetbankingLoginDto } from './dto/netbanking-login.dto';
import { JwtService } from '@nestjs/jwt';
import { RequestResetDto } from './dto/request-reset.dto';


@Injectable()
export class NetbankingService {
  constructor(
    @InjectRepository(NetBanking) private netRepo: Repository<NetBanking>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    private accountService: AccountService,
    private jwtService: JwtService,
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

  async login(dto: NetbankingLoginDto) {
    const user = await this.netRepo.findOne({
      where: { accountNumber: dto.accountNumber },
    });

    if (!user || !(await bcrypt.compare(dto.loginPassword, user.loginPassword))) {
   
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { accountNumber: user.accountNumber, type: 'netbanking' };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async requestReset(dto: RequestResetDto) {
    const user = await this.netRepo.findOne({ where: { accountNumber: dto.email } });
    if (!user) throw new NotFoundException('User not found');

    // Send reset email
    await this.mailerService.sendMail({
      to: dto.email,
      subject: 'Password Reset',
      text: `Hello, use this link to reset your password: http://localhost:3000/reset?email=${dto.email}`,
    });

    return { message: 'Password reset email sent' };
  }

  
  
}
