import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCustomer } from './entities/rentCustomer.entity';
import { RentCustomerResolver } from './rentCustomer.resolver';
import { RentCustomerService } from './rentCustomer.service';

@Module({
  imports: [TypeOrmModule.forFeature([RentCustomer])],
  providers: [
    RentCustomerResolver, //
    RentCustomerService,
  ],
})
export class RentCustomerModule {}
