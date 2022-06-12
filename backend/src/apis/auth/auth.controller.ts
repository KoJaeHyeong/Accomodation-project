import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RentUser } from '../User/entities/rentUser.entity';
import { Request, Response } from 'express';
import { RentUserService } from '../User/rentUser.service';
import { AuthService } from '../auth/auth.service';

interface IOAuthUser {
  user: Pick<RentUser, 'email' | 'password' | 'name' | 'birth'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly rentUserService: RentUserService, //
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin({ req, res });
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    this.authService.socialLogin1({ req, res });
  }
}
