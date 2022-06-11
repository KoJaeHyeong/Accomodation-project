import { InputType, PartialType } from '@nestjs/graphql';
import { createRentInput } from './createRent.input';

@InputType()
export class updateRentInput extends PartialType(createRentInput) {}
