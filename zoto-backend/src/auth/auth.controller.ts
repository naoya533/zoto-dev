import { Controller, Get,Post,Body,UseGuards,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(
    @Body() credentialsDto:CredentialsDto,
  ):Promise<{accessToken:string}> {
    return await this.authService.signIn(credentialsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

}
