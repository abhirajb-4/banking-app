import { Module } from '@nestjs/common';
import { NetbankingController } from './netbanking.controller';
import { NetbankingService } from './netbanking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetBanking } from './entity/netbanking.entity';
import { Account } from 'src/account/entity/account.entity';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NetBanking, Account]), 
    AccountModule
  ],
  controllers: [NetbankingController],
  providers: [NetbankingService]
})
export class NetbankingModule {}
