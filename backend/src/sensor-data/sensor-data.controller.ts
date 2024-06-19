import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorDataEntity } from './sensor-data.entity';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor-data.dto';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Get()
  findAll(): Promise<SensorDataEntity[]> {
    return this.sensorDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SensorDataEntity> {
    return this.sensorDataService.findOne(+id);
  }

  @Post()
  create(@Body() createSensorDataDto: CreateSensorDataDto): Promise<SensorDataEntity> {
    const sensorDataEntity = new SensorDataEntity();
    sensorDataEntity.soilMoisturePercentage = createSensorDataDto.soilMoisturePercentage;
    sensorDataEntity.moistured = createSensorDataDto.moistured;
    return this.sensorDataService.create(sensorDataEntity);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateSensorDataDto: UpdateSensorDataDto): Promise<SensorDataEntity> {
    const sensorDataEntity = new SensorDataEntity();
    sensorDataEntity.soilMoisturePercentage = updateSensorDataDto.soilMoisturePercentage;
    sensorDataEntity.moistured = updateSensorDataDto.moistured;
    return this.sensorDataService.update(+id, sensorDataEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.sensorDataService.remove(+id);
  }
}
