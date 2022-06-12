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
  @PrimaryGeneratedColumn('uuid')
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
