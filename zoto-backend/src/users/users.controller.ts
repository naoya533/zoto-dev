import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User | null> {
    return this.usersService.getUserByemail(email);
  }

  @Put(':email')
  async update(
    @Param('email') email:string ,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(email, updateUserDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string): Promise<User> {
    return this.usersService.deleteUser(email);
  }
}
