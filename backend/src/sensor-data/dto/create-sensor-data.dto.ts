import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSensorDataDto {
  @IsNumber()
  @IsNotEmpty()
  soilMoisturePercentage: number;

  @IsBoolean()
  @IsNotEmpty()
  moistured: boolean;
}
