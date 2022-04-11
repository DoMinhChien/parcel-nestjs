import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';


@Entity('driver')
export class DriverEntity {
    @PrimaryColumn({ unique: true })
  public  id: string;
    @Column('varchar', { length: 500 })
    public  area: string;
    @Column('varchar', { length: 100 })
    public  status: string;
    
    @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.drivers)
    public vehicle: VehicleEntity;  
}


