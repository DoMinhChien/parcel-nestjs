import { WarehouseEntity } from '../../warehouse/entities/warehouse.entity';
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
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { SubOrderEntity } from './suborder.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryColumn({ unique: true })
  id: string;
  @Column('int', { default: 0 })
  status: number;
  @ManyToMany(() => UserEntity)
  @JoinTable()
  drivers: UserEntity[];
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
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;
  @Column('int', { default: 0 })
  value: number;
  @OneToMany(() => SubOrderEntity, (subOrder) => subOrder.order)
  subOrders: SubOrderEntity[];
  @ManyToOne(() => WarehouseEntity, (warehouse) => warehouse.srcOrders)
  srcWarehouse: WarehouseEntity;
  @ManyToOne(() => WarehouseEntity, (warehouse) => warehouse.destOrders)
  destWarehouse: WarehouseEntity;
}
