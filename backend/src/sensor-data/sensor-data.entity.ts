import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class SensorDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { precision: 5, scale: 2 })
  soilMoisturePercentage: number;

  @Column()
  moistured: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
