import { InputType, PartialType } from '@nestjs/graphql';
import { createRentUserInput } from './creatRentUser.input';

@InputType()
export class updateRentUserInput extends PartialType(createRentUserInput) {}
