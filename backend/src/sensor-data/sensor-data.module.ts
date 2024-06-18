import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDataService } from './sensor-data.service';
import { SensorDataEntity } from './sensor-data.entity';
import { SensorDataController } from './sensor-data.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SensorDataEntity])],
  providers: [SensorDataService],
  controllers: [SensorDataController],
})
export class SensorDataModule {}
