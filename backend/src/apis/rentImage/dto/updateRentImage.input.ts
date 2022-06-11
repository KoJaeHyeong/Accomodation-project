import { InputType, PartialType } from '@nestjs/graphql';
import { RentImageInput } from './rentImage.input';

@InputType()
export class updateRentImageInput extends PartialType(RentImageInput) {}
