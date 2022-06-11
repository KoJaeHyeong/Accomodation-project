import { InputType, OmitType } from '@nestjs/graphql';
import { RentToknow } from '../entities/rentToknow.entity';

@InputType()
export class RentToknowInput extends OmitType(
  RentToknow, //
  ['id'],
  InputType,
) {}
