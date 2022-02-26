import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../../account/entities/account.entity';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int)
  id: number;

  @Field(() => Int, { name: 'id' })
  @Column()
  user_id: number;

  @Column()
  @Field({ name: 'name' })
  user_name: string;

  @Field(() => [Account], { name: 'accounts' })
  bank_accounts: Account[];

  @Column()
  @ManyToMany(() => Account, (account) => account.bank_code)
  ifsc_code: string;
}
