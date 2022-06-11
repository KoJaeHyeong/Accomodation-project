import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Rent } from 'src/apis/rent/entities/rent.entity';

@Entity() // 테이블로 만들어줘
@ObjectType()
export class RentUser {
  @PrimaryGeneratedColumn('uuid') // Generated 우리가 따로 안만들어도 알아서 자동으로 만들어 진다.
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) //비밀번호 노출 금지
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Date)
  birth: Date;

  @DeleteDateColumn()
  deleted: Date;
}
