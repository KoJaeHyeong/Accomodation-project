import { ObjectType, Field } from '@nestjs/graphql';
import { Rent } from 'src/apis/rent/entities/rent.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class RentImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  mainUrl: string;

  @ManyToOne(() => Rent)
  @Field(() => Rent)
  rent: Rent;
}
