import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Weather } from './weather.model';

@Injectable()
export class WeatherService {
  async getWeather(city: string): Promise<Weather> {
    const apiResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`,
    );
    if (apiResponse.status !== 200) {
      throw new HttpException('COUlD_NOT_GET_WEATHER_DATA', 404);
    }
    return {
      temperature: apiResponse.data.main.temp,
      humidity: apiResponse.data.main.humidity,
    };
  }
}
