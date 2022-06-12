import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_ID_KEY,
      clientSecret: process.env.NAVER_SECRET_KEY,
      callbackURL: 'http://localhost:3000/login/naver',
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('1', accessToken);
    console.log('2', refreshToken);
    console.log('3', profile);
    return {
      email: profile.email,
      password: '1111',
      name: profile.name,
      birth: '1994-04-15',
    }; // 콘솔에 찍히는 profile을 확인후에 받을 값을 보고 설정해줘야한다
  }
}
