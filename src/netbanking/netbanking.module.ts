import { Module } from '@nestjs/common';
import { NetbankingController } from './netbanking.controller';
import { NetbankingService } from './netbanking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetBanking } from './entity/netbanking.entity';
import { Account } from 'src/account/entity/account.entity';
import { AccountModule } from 'src/account/account.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forFeature([NetBanking, Account]), 
    AccountModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [NetbankingController],
  providers: [NetbankingService]
})
export class NetbankingModule {}
