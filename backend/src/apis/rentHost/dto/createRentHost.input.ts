import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class createRentHostInput {
  @Field(() => Boolean)
  isAuth: boolean;

  @Field(() => String)
  contents: string;

  @Field(() => Int)
  total_pre: number;

  @Field(() => String)
  host_nick: string;
}
