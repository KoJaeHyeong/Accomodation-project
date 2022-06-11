import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class RentToknow {
  @PrimaryGeneratedColumn('uuid') // Generated 우리가 따로 안만들어도 알아서 자동으로 만들어 진다.
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  rule: string;

  @Column()
  @Field(() => String)
  health_safty: string;

  @Column()
  @Field(() => String)
  refund_policy: string;

  @DeleteDateColumn()
  deleted: Date;
}
