import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('sub_order')
export class SubOrderEntity {
  @PrimaryColumn({ unique: true })
  id: string;
  @Column('varchar', { length: 500 })
  status: string;
  @Column('varchar', { length: 64 })
  name: string;
  @Column('int', { default: 0 })
  weight: number;
  @ManyToOne(() => OrderEntity, (order) => order.subOrders)
  order: OrderEntity;
}
