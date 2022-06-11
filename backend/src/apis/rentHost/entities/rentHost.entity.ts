import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class RentHost {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Boolean)
  isAuth: boolean;

  @Column()
  @Field(() => Int)
  total_pre: number;

  @Column()
  @Field(() => String)
  host_nick: string;

  @DeleteDateColumn()
  deleted: Date;

  @DeleteDateColumn()
  updated: Date;
}
