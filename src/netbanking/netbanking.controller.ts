import { Body, Controller, Post, BadRequestException, UseGuards, Get } from '@nestjs/common';
import { RegisterNetBankingDto } from './dto/register-netbanking.dto';
import { NetbankingService } from './netbanking.service';
import { NetbankingLoginDto } from './dto/netbanking-login.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RequestResetDto } from './dto/request-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

  @Post('login')
  login(@Body() dto: NetbankingLoginDto) {
    return this.netbankingService.login(dto);
  }

  @Post('request-reset')
  requestReset(@Body() dto: RequestResetDto) {
    return this.netbankingService.requestReset(dto);

  }
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.netbankingService.resetPassword(dto);
  }


  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboard() {
    return { message: 'You are logged in as a NetBanking user' };
  }
}
