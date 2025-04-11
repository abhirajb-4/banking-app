import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entity/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true })) // Auto-convert and validate DTO
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'PAN/Aadhar/Email already exists',
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.createUser(createUserDto);
    return this.toUserResponseDto(user);
  }

  private toUserResponseDto(user: User): UserResponseDto {
    const { id, name, email, phoneNo, approved } = user;
    return { id, name, email, phoneNo, approved };
  }
}