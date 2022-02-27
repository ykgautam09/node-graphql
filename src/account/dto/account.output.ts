import { Field, ObjectType } from '@nestjs/graphql';
import { Weather } from '../../weather/weather.model';

@ObjectType()
export class AccountOutput {
  @Field()
  bank: string;

  @Field()
  branch: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  district: string;

  @Field()
  state: string;

  @Field()
  bank_code: string;

  @Field(() => Weather, { name: 'weather' })
  weather: Weather;
}
