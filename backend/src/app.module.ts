import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDataEntity } from './sensor-data/sensor-data.entity';
import { SensorDataModule } from './sensor-data/sensor-data.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-curly-heart-a4xyt720.us-east-1.aws.neon.tech',
      port: 5432,
      username: 'hortadb_owner',
      password: 'clTfvaE40dxo',
      database: 'hortadb',
      entities: [SensorDataEntity],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      },
    }),
    SensorDataModule,
  ],
})
export class AppModule {}
