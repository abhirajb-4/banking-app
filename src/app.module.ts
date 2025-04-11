import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/admin.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass@word1', // update as needed
      database: 'banking',
      entities: [User,Admin],
      synchronize: true,
    }),UserModule,  AdminModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
