import { InputType, OmitType } from '@nestjs/graphql';
import { RentExplain } from '../entities/rentExplain.entity';

@InputType()
export class RentExplainInput extends OmitType(
  RentExplain, //
  ['id'],
  InputType,
) {}
