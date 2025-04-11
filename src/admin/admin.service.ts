import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {}

  // Create default super admin
  async createDefaultAdmin(): Promise<void> {
    const exists = await this.adminRepo.findOne({ where: { email: 'admin@example.com' } });
    if (!exists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = this.adminRepo.create({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      });
      await this.adminRepo.save(admin);
    }
  }

  // Used in AuthService for login
  async findByEmail(email: string): Promise<Admin | null> {
    const admin =  this.adminRepo.findOne({ where: { email } });
    if(!admin){
        throw new NotFoundException(`Admin with email ${email} not found`);
    }
    return admin;
  }

  // Optional: fetch admin by ID
  async findById(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }
}
