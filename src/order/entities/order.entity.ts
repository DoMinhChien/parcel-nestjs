import { DriverEntity } from '../../driver/entities/driver.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { WarehouseEntity } from '../../warehouse/entities/warehouse.entity';
import { SubOrderEntity } from './sub-order.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryColumn({ unique: true })
  id: string;
  @Column('int', { default: 0 })
  status: number;
  @ManyToMany(() => DriverEntity)
  @JoinTable()
  drivers: DriverEntity[];
  @Column('int', { default: 0 })
  fee: number;
  @Column('boolean', { default: false })
  isDirectPickup: boolean;
  @Column('boolean', { default: false })
  isDirectDelivery: boolean;
  @Column('varchar', { length: 500 })
  description: string;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
  @Column('boolean', { default: false })
  paymentSide: boolean;
  @Column('int', { default: 0 })
  paymentStatus: number;
  @Column('decimal', { precision: 5, scale: 2 })
  totalWeight: number;
  @Column()
  userId: string;
  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({name: "userId"})
  user: UserEntity;
  @Column('int', { default: 0 })
  value: number;
  @OneToMany(() => SubOrderEntity, (subOrder) => subOrder.order)
  subOrders: SubOrderEntity[];
  @Column()
  srcWarehouseId: string;
  @ManyToOne(() => WarehouseEntity, (warehouse) => warehouse.srcOrders)
  @JoinColumn({name: "srcWarehouseId"})
  srcWarehouse: WarehouseEntity;
  @Column()
  destWarehouseId: string;
  @ManyToOne(() => WarehouseEntity, (warehouse) => warehouse.destOrders)
  @JoinColumn({name: "destWarehouseId"})
  destWarehouse: WarehouseEntity;
}
