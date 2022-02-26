import { Field, ObjectType } from '@nestjs/graphql';
import { Weather } from '../../weather/weather.model';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  bank: string;

  @Field()
  @Column()
  branch: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  district: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  @ManyToMany(() => User, (user) => user.ifsc_code)
  bank_code: string;

  @Field(() => Weather)
  weather: Weather;
}
