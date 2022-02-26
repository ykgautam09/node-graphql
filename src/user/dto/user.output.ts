import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Account } from '../../account/entities/account.entity';

@ObjectType()
export class UserOutput {
  @Field(() => Int)
  id: string;

  @Field()
  name: string;

  @Field(() => [Account])
  accounts: Account[];
}
