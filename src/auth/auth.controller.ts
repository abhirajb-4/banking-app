import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const admin = await this.authService.validateAdmin(body.email, body.password);
    return this.authService.login(admin);
  }
}
