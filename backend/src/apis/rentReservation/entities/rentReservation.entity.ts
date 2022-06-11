import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Rent } from 'src/apis/rent/entities/rent.entity';
import { RentUser } from 'src/apis/rentUser/entities/rentUser.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  // 좀더 검색 해보기(이해)
  // 원래 enum은 일반적으로 대문자로 작성하는게 관례이다.
  name: 'POINT_TRANSACTION_STATUS_ENUM',
}); //enum을 그래프큐엘에서 쓸 수 있게 설정해줘야 한다.

@Entity()
@ObjectType()
export class RentReservation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  imp_uid: string;

  @Column()
  @Field(() => Float)
  price: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM) // 위에 register로 설정을 해줌.
  status: string;

  @ManyToOne(() => Rent) // 이쪽 좀더 공부해보자! 다대다가 아니라 둘다 manytoone관계
  @Field(() => Rent)
  rent: Rent;

  @ManyToOne(() => RentUser)
  @Field(() => RentUser)
  rentUser: RentUser;

  @CreateDateColumn() // 자동으로 날짜가 기록
  @Field(() => Date)
  createAt: Date;
}
