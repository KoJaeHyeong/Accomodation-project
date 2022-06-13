import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_REST_ID, // restApi 키
      clientSecret: process.env.KAKAO_SECRET_KEY,
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('1', accessToken);
    console.log('2', refreshToken);
    console.log('3', profile);
    return {
      email: profile._json.kakao_account.email,
      password: profile.id,
      name: profile.displayName,
      birth: profile._json.kakao_account.birthday,
    };
  }
}
