import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //console.log('JWT Payload:', payload); // デバッグ用ログ
    return { 
      userId: payload.id, // JWT ペイロードのサブ（subject）フィールドを userId として使用
      email: payload.email,
      companyCode: payload.companyCode, // JWT ペイロードから companyCode を取得 };
    };
  }
}
