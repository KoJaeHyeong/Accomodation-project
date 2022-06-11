import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RentImageInput {
  @Field(() => [String])
  mainUrl: string[];

  @Field(() => [String], { nullable: true })
  subUrl: string[];

  @Field(() => String)
  rentId: string;
}
