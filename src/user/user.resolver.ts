import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Account } from '../account/entities/account.entity';
import { UserOutput } from './dto/user.output';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'addAccountDetails' })
  createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Query(() => UserOutput, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @ResolveField('accounts', () => [Account])
  async accounts(@Parent() user: User) {
    return await this.userService.accounts(user.user_id);
  }
}
