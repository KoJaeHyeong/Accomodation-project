import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class createRentUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  birth: string;
}
