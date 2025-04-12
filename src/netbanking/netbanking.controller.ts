import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { RegisterNetBankingDto } from './dto/register-netbanking.dto';
import { NetbankingService } from './netbanking.service';

@Controller('netbanking')
export class NetbankingController {
  constructor(private readonly netbankingService: NetbankingService) {}

  @Post('register')
  async register(@Body() dto: RegisterNetBankingDto) {
    if (dto.loginPassword !== dto.confirmLoginPassword) {
      throw new BadRequestException('Login passwords do not match');
    }
    if (dto.transactionPassword !== dto.confirmTransactionPassword) {
      throw new BadRequestException('Transaction passwords do not match');
    }

    return this.netbankingService.register(dto);
  }
}
