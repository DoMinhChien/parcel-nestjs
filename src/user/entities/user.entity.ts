import { OrderEntity } from '../../order/entities/order.entity';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany } from 'typeorm';

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
}
