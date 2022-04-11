import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('sub_order')
export class SubOrderEntity {
  @PrimaryColumn({ unique: true })
  id: string;
  @Column('int', { default: 0 })
  status: number;
  @Column('varchar', { length: 64 })
  name: string;
  @Column('int', { default: 0 })
  weight: number;
  @Column()
  orderId: string;
  @ManyToOne(() => OrderEntity, (order) => order.subOrders)
  @JoinColumn({name: "orderId"})
  order: OrderEntity;
}
