import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentImageResolver } from './rentImage.resolver';
import { RentImageService } from './rentImage.service';
import { RentImage } from './entities/rentImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentImage])],
  providers: [
    RentImageResolver, //
    RentImageService,
  ],
})
export class RentImageModule {}
