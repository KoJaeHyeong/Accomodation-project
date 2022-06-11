import { Field, Float, InputType } from '@nestjs/graphql';
import { RentExplainInput } from 'src/apis/rentExplain/dto/rentExplain.input';
import { RentToknowInput } from 'src/apis/rentToknow/dto/rentToknow.input';

@InputType() // inputtype으로 쓰기위해서 데코레이터 설정!!
export class createRentScoreInput {
  @Field(() => Float)
  pre_score_clean: number;

  @Field(() => Float)
  pre_score_comu: number;

  @Field(() => Float)
  pre_score_checkin: number;

  @Field(() => Float)
  pre_score_exact: number;

  @Field(() => Float)
  pre_score_location: number;

  @Field(() => Float)
  pre_score_satisfy: number;

  @Field(() => String)
  rentHostId: string;

  @Field(() => RentToknowInput)
  rentToknow: RentToknowInput;

  @Field(() => RentExplainInput)
  rentExplain: RentExplainInput;

  @Field(() => [String])
  rentFacility: string[];

  @Field(() => [String])
  rentLocation: string[];

  @Field(() => [String])
  rentTrans: string[];
}
