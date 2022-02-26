import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  user_id: number;

  @Field()
  user_name: string;

  @Field(() => [String], { name: 'bank_accounts' })
  bank_accounts: string[];
}
