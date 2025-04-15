import { Module } from '@nestjs/common';
import { PayeeService } from './payee.service';
import { PayeeController } from './payee.controller';

@Module({
  providers: [PayeeService],
  controllers: [PayeeController]
})
export class PayeeModule {}
