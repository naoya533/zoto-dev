import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password,salt);
    return this.prisma.user.create({ data });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserByemail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email:email } });
  }

  async updateUser(email: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { email:email },
      data,
    });
  }

  async deleteUser(email: string): Promise<User> {
    return this.prisma.user.delete({ where: { email:email } });
  }
}
