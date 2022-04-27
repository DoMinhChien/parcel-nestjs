import { OrderEntity } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';


@Entity('recipient')
export class RecipientEntity {
    @PrimaryColumn({ unique: true })
    public  id: string;

    @Column('varchar', { length: 255 })
    public  name: string;

    @Column('varchar', { length: 255 })
    public  address: string;

    @Column('varchar', { length: 100 })
    public  phone: string;

    @Column('varchar', { length: 255 })
    public  information: string;

    @OneToMany(() => OrderEntity, (order) => order.recipient)
    orders: OrderEntity[];
}


