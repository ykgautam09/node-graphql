import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { WeatherService } from '../weather/weather.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly accountService: AccountService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserInput) {
    let user_;
    const existingUser = await this.userRepository.findOne({
      user_id: userData.user_id,
    });
    if (existingUser?.id) {
      await this.userRepository.delete({ user_id: existingUser.user_id });
    }
    for (let i = 0; i < userData.bank_accounts.length; i++) {
      const data = {
        user_name: userData.user_name,
        user_id: userData.user_id,
        ifsc_code: userData.bank_accounts[i],
      };
      user_ = await this.userRepository.create(data);
      await this.userRepository.save(user_);
      await this.accountService.createOne(data.ifsc_code);
    }
    return {
      user_id: userData.user_id,
      user_name: userData.user_name,
    };
  }

  async findOne(userId: number) {
    const ifsc_code = [];
    const result = await this.userRepository.find({ user_id: userId });
    const resultMapping = {
      id: result[0].user_id,
      name: result[0].user_name,
      accounts: [],
    };
    for (let i = 0; i < result.length; i++) {
      ifsc_code.push(result[0].ifsc_code);
    }
    for (let i = 0; i < ifsc_code.length; i++) {
      resultMapping.accounts.push(
        await this.accountService.resolveAccountWeather(ifsc_code[i]),
      );
    }
    // {
    //   name: 'user1',
    //       id: 7,
    //     accounts: [
    //   {
    //     bank: 'String!',
    //     branch: 'String!',
    //     address: 'String!',
    //     city: 'String!',
    //     district: 'String!',
    //     state: ' String!',
    //     bank_code: 'String!',
    //     weather: {
    //       temperature: 12,
    //       humidity: 123,
    //     },
    //   },
    // ],
    // };
    console.log(resultMapping, typeof resultMapping);
    return resultMapping;
  }

  async weather(city) {
    const weather = await this.weatherService.getWeather(city);
    return weather;
  }

  async accounts(userId: number) {
    const result = await this.userRepository.find({ user_id: userId });
    const resultMapping = [];
    let account;
    for (let i = 0; i < result.length; i++) {
      account = await this.accountService.getAccountDetails(
        result[i].ifsc_code,
      );
      resultMapping.push({
        account,
        weather: await this.weather(account.city),
      });
    }
    return resultMapping;
  }
}
