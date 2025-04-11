import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (admin && await bcrypt.compare(password, admin.password)) {
      const { password, ...result } = admin;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(admin: Admin) {
    const payload = { email: admin.email, sub: admin.id, role: admin.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
