import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createRentCustomerInput {
  @Field(() => String)
  rentId: string;

  @Field(() => String)
  contents: string;
}
