import { Rent } from 'src/apis/rent/entities/rent.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class RentFacility {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  lists: string;

  @ManyToMany(() => Rent, (rent) => rent.rentFacility)
  @Field(() => [Rent])
  rent: Rent[];

  @DeleteDateColumn()
  deleted: Date;
}
