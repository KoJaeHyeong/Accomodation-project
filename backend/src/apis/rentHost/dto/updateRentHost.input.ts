import { InputType, PartialType } from '@nestjs/graphql';
import { createRentHostInput } from './createRentHost.input';

@InputType()
export class updateRentHostInput extends PartialType(createRentHostInput) {}
