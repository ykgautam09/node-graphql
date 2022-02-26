import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountService: Repository<Account>,
    private readonly weatherService: WeatherService,
  ) {}

  async getAccountDetails(ifscCode: string) {
    const apiResponse = await axios.get(
      `https://ifsc.razorpay.com/${ifscCode}`,
    );
    if (apiResponse.status !== 200) {
      throw new HttpException('COUlD_NOT_GET_BANK_DATA', 404);
    }
    return {
      address: apiResponse.data.ADDRESS,
      bank: apiResponse.data.BANK,
      bank_code: apiResponse.data.BANKCODE,
      branch: apiResponse.data.BRANCH,
      city: apiResponse.data.CITY,
      district: apiResponse.data.DISTRICT,
      state: apiResponse.data.STATE,
    };
  }
  async createOne(ifsc: string) {
    const accountData = await this.getAccountDetails(ifsc);
    const newAccount = this.accountService.create(accountData);
    await this.accountService.save(newAccount);
  }

  async findOne(ifsc: string) {
    return await this.getAccountDetails(ifsc);
  }

  async weather(city) {
    const weather = await this.weatherService.getWeather(city);
    return weather;
  }
}
