import { Field, Float, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
export class Weather {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
  temp: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
  humidity: number;
}
