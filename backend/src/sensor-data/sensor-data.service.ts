import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorDataEntity } from './sensor-data.entity';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor-data.dto';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorDataEntity)
    private sensorDataRepository: Repository<SensorDataEntity>,
  ) {}

  findAll(): Promise<SensorDataEntity[]> {
    return this.sensorDataRepository.find();
  }

  findOne(id: number): Promise<SensorDataEntity> {
    return this.sensorDataRepository.findOneBy({ id });
  }

  create(createSensorDataDto: CreateSensorDataDto): Promise<SensorDataEntity> {
    const sensorDataEntity = this.sensorDataRepository.create(createSensorDataDto);
    return this.sensorDataRepository.save(sensorDataEntity);
  }

  async update(id: number, updateSensorDataDto: UpdateSensorDataDto): Promise<SensorDataEntity> {
    await this.sensorDataRepository.update(id, updateSensorDataDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sensorDataRepository.delete(id);
  }
}
