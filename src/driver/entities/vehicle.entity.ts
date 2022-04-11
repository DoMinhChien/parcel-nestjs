import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, Driver } from 'typeorm';
import { DriverEntity } from './driver.entity';

@Entity('vehicle')
export class VehicleEntity {
  @PrimaryColumn({ unique: true })
  id: string;
  @Column('int')
  currentWeight: number;
  @Column('int')
  totalWeight: number;
  @Column('varchar', { length: 20 })
  number: string;

  @OneToMany(() => DriverEntity, (driver) => driver.vehicle)
  drivers: DriverEntity[];
}
