import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentHostResolver } from './rentHost.resolver';
import { RentHostService } from './rentHost.service';
import { RentHost } from './entities/rentHost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentHost])],
  providers: [
    RentHostResolver, //
    RentHostService,
  ],
})
export class RentHostModule {}
