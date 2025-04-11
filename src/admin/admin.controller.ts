import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private userService: UserService) {}

  @Patch('approve/:id')
  async approveUser(@Param('id') id: number) {
    return this.userService.approveUser(id);
  }
}
