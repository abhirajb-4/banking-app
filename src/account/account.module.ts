import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './entity/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]), 
  ],
  providers: [AccountService,MailService],
  controllers: [AccountController],
  exports:[AccountService,MailService]
})
export class AccountModule {}
