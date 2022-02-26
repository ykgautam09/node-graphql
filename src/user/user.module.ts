import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { WeatherModule } from '../weather/weather.module';
import { AccountModule } from '../account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountModule, WeatherModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
