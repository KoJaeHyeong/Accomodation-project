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
export class RentLocation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  lists: string;

  @DeleteDateColumn()
  deleted: Date;

  @ManyToMany(() => Rent, (rent) => rent.rentLocation)
  @Field(() => [Rent])
  rent: Rent[];
}
