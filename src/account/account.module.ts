import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { WeatherModule } from '../weather/weather.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), WeatherModule],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
