import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check for duplicate PAN/Aadhar/Email
    await this.checkForDuplicates(createUserDto);

    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  private async checkForDuplicates(dto: CreateUserDto): Promise<void> {
    const { panCard, aadharNo, email } = dto;

    const existingUser = await this.userRepository.findOne({
      where: [
        { panCard },
        { aadharNo },
        { email },
      ],
    });

    if (existingUser) {
      if (existingUser.panCard === panCard) {
        throw new ConflictException('PAN card already registered');
      }
      if (existingUser.aadharNo === aadharNo) {
        throw new ConflictException('Aadhar number already registered');
      }
      if (existingUser.email === email) {
        throw new ConflictException('Email already registered');
      }
    }
  }

  // Add other methods (findAll, findById, update, delete) as needed

  async approveUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.approved = true;
    return this.userRepository.save(user);
  }
}