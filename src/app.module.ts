import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/admin.entity';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { Account } from './account/entity/account.entity';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { NetbankingModule } from './netbanking/netbanking.module';
import { NetBanking } from './netbanking/entity/netbanking.entity';
import { PayeeModule } from './payee/payee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'banking',
      entities: [User,Admin,Account,NetBanking],
      synchronize: true,
    }),UserModule,  AdminModule,AuthModule, AccountModule,
  
    //EMAIL
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'abhiraj.junksites@gmail.com',
          pass: 'wwqn lobu otbc ocpy',
        },
      },
      defaults: {
        from: '"Bank Support" <your-email@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  
    NetbankingModule,
  
    PayeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
