import { OrderEntity } from '../../order/entities/order.entity';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { DriverEntity } from 'src/driver/entities/driver.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column('varchar', { length: 500 })
  email: string;
  @Column('varchar', { length: 64 })
  displayName: string;
  @Column('varchar', { length: 500 })
  password: string;
  @Column('varchar', { length: 64 })
  address: string;
  @Column('varchar', { length: 64 })
  phone: string;
  @Column('varchar', {})
  provinceCode: string;
  @Column('int', { default: 0 })
  gender: number;
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;
  @OneToOne(() => DriverEntity, driver => driver.user) // specify inverse side as a second parameter
  driver: DriverEntity;
}
