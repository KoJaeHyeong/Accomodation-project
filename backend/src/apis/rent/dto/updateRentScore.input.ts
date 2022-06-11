import { InputType, PartialType } from '@nestjs/graphql';
import { createRentScoreInput } from './createRentScore.input';

@InputType()
export class updateRentScoreInput extends PartialType(createRentScoreInput) {}
