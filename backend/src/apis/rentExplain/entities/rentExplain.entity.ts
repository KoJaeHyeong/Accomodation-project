import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class RentExplain {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column() // 구성
  @Field(() => String)
  makedUp: string;

  @Column()
  @Field(() => String)
  explain: string;

  @DeleteDateColumn()
  deleted: Date;
}
