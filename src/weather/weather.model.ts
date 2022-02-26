import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@ObjectType()
export class Weather {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  humidity: number;
}
