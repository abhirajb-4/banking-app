import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { AccountService } from 'src/account/account.service';
import { CreateAccountDto } from './dto/createAcccount.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private userService: UserService,
    private accountService:AccountService
  ) {}

  @Patch('approve/:id')
  async approveUser(@Param('id') id: number) {
    const result = await this.userService.approveUser(id);

    if(result == null){
      console.log(result);
    }

    const accountDto = new CreateAccountDto();
    accountDto.email = result.email;
    accountDto.userId = result.id;
    
  }
}
