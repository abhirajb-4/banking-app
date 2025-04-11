import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // This registers the User repository
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Optional: Export if the service is used elsewhere
})
export class UserModule {}
