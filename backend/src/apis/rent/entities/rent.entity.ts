import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { RentHost } from 'src/apis/rentHost/entities/rentHost.entity';
import { RentTrans } from 'src/apis/rentTrans/entities/rentTrans.entity';
import { ManyToOne } from 'typeorm';
import { RentFacility } from 'src/apis/rentFacility/entities/rentFacility.entity';
import { RentExplain } from 'src/apis/rentExplain/entities/rentExplain.entity';
import { RentLocation } from 'src/apis/rentLoca/entities/rentLocation.entity';
import { Field, ObjectType, Float } from '@nestjs/graphql';
import { RentToknow } from 'src/apis/rentToknow/entities/rentToknow.entity';

@Entity() // 테이블로 만들어줘
@ObjectType()
export class Rent {
  @PrimaryGeneratedColumn('uuid') // Generated 우리가 따로 안만들어도 알아서 자동으로 만들어 진다.
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  house_name: string;

  @Column('float')
  @Field(() => Float)
  price: number;

  @Column('float')
  @Field(() => Float)
  star_score: number;

  @Column('float')
  @Field(() => Float)
  pre_score_clean: number;

  @Column('float')
  @Field(() => Float)
  pre_score_comu: number;

  @Column('float')
  @Field(() => Float)
  pre_score_checkin: number;

  @Column('float')
  @Field(() => Float)
  pre_score_exact: number;

  @Column('float')
  @Field(() => Float)
  pre_score_location: number;

  @Column('float')
  @Field(() => Float)
  pre_score_satisfy: number;

  @Column('float')
  @Field(() => Float)
  rent_pre_number: number;

  @Column()
  @Field(() => String)
  rent_contents: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn() // 숙소설명
  @OneToOne(() => RentExplain)
  @Field(() => RentExplain)
  rentExplain: RentExplain;

  @JoinColumn() // 알아두어야할 사항
  @OneToOne(() => RentToknow)
  @Field(() => RentToknow)
  rentToknow: RentToknow;

  @ManyToOne(() => RentHost) // 호스트
  @Field(() => RentHost)
  rentHost: RentHost;

  @JoinTable()
  @ManyToMany(() => RentFacility, (rentFacility) => rentFacility.rent)
  @Field(() => RentFacility)
  rentFacility: RentFacility; // 편의시설

  @JoinTable()
  @ManyToMany(() => RentTrans, (rentTrans) => rentTrans.rent)
  @Field(() => [RentTrans])
  rentTrans: RentTrans[]; // 이동수단

  @JoinTable()
  @ManyToMany(() => RentLocation, (rentLocation) => rentLocation.rent)
  @Field(() => [RentLocation])
  rentLocation: RentLocation[]; // 위치
}
