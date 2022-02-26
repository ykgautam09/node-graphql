import { IsNotEmpty, IsNumber } from 'class-validator';

export class WeatherDto {
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  humidity: number;
}
