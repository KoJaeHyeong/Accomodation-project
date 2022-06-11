import { PartialType, InputType } from '@nestjs/graphql';
import { createRentCustomerInput } from './createRentCustomer.input';

@InputType()
export class updateRentCustomerInput extends PartialType(
  createRentCustomerInput,
) {}
