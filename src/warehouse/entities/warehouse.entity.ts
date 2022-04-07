import { OrderEntity } from 'src/order/entities/order.entity';
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

@Entity('warehouse')
export class WarehouseEntity {
  @PrimaryColumn({ unique: true })
  id: string;
  @Column('varchar', { length: 500 })
  name: string;
  @Column('varchar', { length: 500 })
  address: string;
  @OneToMany(() => OrderEntity, (order) => order.srcWarehouse)
  srcOrders: OrderEntity[];
  @OneToMany(() => OrderEntity, (order) => order.destWarehouse)
  destOrders: OrderEntity[];
}
