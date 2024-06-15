import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { PrismaService } from '../prisma.service'; 

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log("動いています");
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password,user.password))) {
      return user;
    }
    return null;
  }

  async signIn(
    credentialsDto:CredentialsDto,
  ):Promise<{accessToken:string}>{
    const {email,password} = credentialsDto;
    const user = await this.usersService.getUserByemail(email);

    if(user && (await bcrypt.compare(password,user.password))){
      const payload = {id:user.id,email:user.email,companyCode: user.companyCode};
      const accessToken = await this.jwtService.sign(payload);
      return {accessToken};
    }

    throw new UnauthorizedException(
      'メールアドレスまたはパスワードを確認してください。'
    );


  }
}
