import { OrderEntity } from '../../order/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DriverEntity } from '../../driver/entities/driver.entity';
import { RoleEntity } from './role.entity';

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
  phone: string;

  @Column('varchar', { length: 64, nullable: true })
  address: string;

  @Column('varchar', { nullable: true })
  provinceCode: string;

  @Column('varchar', { length: 100, nullable: true })
  location: string;

  @Column('int', { default: 0 })
  gender: number;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @OneToOne(() => DriverEntity, (driver) => driver.user) // specify inverse side as a second parameter
  driver: DriverEntity;

  @ManyToMany(() => RoleEntity, (role: RoleEntity) => role.users)
  @JoinTable()
  public roles: RoleEntity[];
}
