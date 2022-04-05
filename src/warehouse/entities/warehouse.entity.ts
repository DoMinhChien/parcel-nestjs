import { OrderEntity } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('warehouse')
export class WarehouseEntity {
  @PrimaryColumn({ unique: true })
  id: string;
  @Column('varchar', { length: 500 })
  name: string;
  @Column('varchar', { length: 500 })
  address: string;
  @OneToMany(() => OrderEntity, order => order.srcWarehouse)
  srcOrders: OrderEntity[];
  @OneToMany(() => OrderEntity, order => order.destWarehouse)
  destOrders: OrderEntity[];
}

// @Entity()
// export class OrderToSrcWarehouse {
//     @PrimaryColumn({ unique: true })
//     id: string;
//     @Column()
//     public orderId!: string;
//     @Column()
//     public warehouseId!: string;
//     @ManyToOne(() => OrderEntity, order => order.orderToSrcWarehouse)
//     public post!: Post;
//     @ManyToOne(() => Category, category => category.postToCategories)
//     public category!: Category;
// }
