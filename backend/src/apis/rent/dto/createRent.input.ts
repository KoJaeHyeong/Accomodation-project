import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class createRentInput {
  @Field(() => String)
  house_name: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  star_score: number;

  @Field(() => Float)
  rent_pre_number: number;

  @Field(() => String)
  rent_contents: string;
}
