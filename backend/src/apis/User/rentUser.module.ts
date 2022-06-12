import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentUserResolver } from './rentUser.resolver';
import { RentUserService } from './rentUser.service';
import { RentUser } from './entities/rentUser.entity';
import { JwtAcessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([RentUser])],
  providers: [
    RentUserResolver, //
    RentUserService,
    JwtAcessStrategy,
  ],
})
export class RentUserModule {}
