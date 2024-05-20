import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() userData: { email: string; password: string; companyCode: string },
  ): Promise<User> {
    return this.usersService.create(
      userData.email,
      userData.password,
      userData.companyCode,
    );
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<User | null> {
    return this.usersService.findByEmail(email);
  }
}
