import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';


@Entity('driver')
export class DriverEntity {
    @PrimaryColumn({ unique: true })
    public  id: string;
    @Column()
    userId: string;
    @OneToOne(() => UserEntity, user => user.driver) // specify inverse side as a second parameter
    @JoinColumn({name: "userId"})
    user: UserEntity;
    @Column('varchar', { length: 500 })
    public  area: string;
    @Column('varchar', { length: 100 })
    public  status: string;
    @Column()
    vehicleId: string;
    @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.drivers)
    @JoinColumn({name: "vehicleId"})
    public vehicle: VehicleEntity;  
}


