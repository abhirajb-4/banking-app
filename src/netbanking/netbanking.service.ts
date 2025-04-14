import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';


@Injectable()
export class NetbankingService {
  constructor(
    @InjectRepository(NetBanking) private netRepo: Repository<NetBanking>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    private accountService: AccountService,
    private jwtService: JwtService,
    private mailService : MailService,
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
      email:account.email,
      loginPassword: hashedLoginPassword,
      transactionPassword: hashedTransactionPassword,
    });
    
    const result = await this.netRepo.save(netBanking);
    
    // Update account's net banking status
    await this.accountService.setNetBankingStatus(dto.accountNumber);
    
    return result;
  }

  async login(dto: NetbankingLoginDto) {
    const MAX_ATTEMPTS = 3;
    const user = await this.netRepo.findOne({
      where: { accountNumber: dto.accountNumber },
    });
  
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if(user.incorretLoginAttempts > MAX_ATTEMPTS){
      throw new ForbiddenException("Account is locked please resest password");
    }
  
    const passwordMatch = await bcrypt.compare(dto.loginPassword, user.loginPassword);
    
    if (!passwordMatch) {
      // Increment incorrect attempts
      user.incorretLoginAttempts = (user.incorretLoginAttempts || 0) + 1;
      await this.netRepo.save(user);
      
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Reset incorrect attempts on successful login
    user.incorretLoginAttempts = 0;
    await this.netRepo.save(user);
  
    const payload = { accountNumber: user.accountNumber, type: 'netbanking' };
    const token = this.jwtService.sign(payload);
  
    return { access_token: token };
  }

  async requestReset(dto: RequestResetDto) {
    const netBanking = await this.netRepo.findOne({ where: { accountNumber: dto.accountNumber } });
    if (!netBanking) throw new NotFoundException('Account not found');

    return await this.mailService.sendPasswordResetLink(
      netBanking.email,
      netBanking.accountNumber,
    );
    return { message: 'Password reset email sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.newPassword !== dto.confirmPassword)
      throw new BadRequestException('Passwords do not match');

    const user = await this.netRepo.findOne({ where: { accountNumber: dto.accountNumber } });
    if (!user) throw new NotFoundException('User not found');

    user.loginPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.netRepo.save(user);

    return { message: 'Password reset successfully' };
  }

}
