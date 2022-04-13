import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverModule } from '../driver/driver.module';
import { OrderEntity } from './entities/order.entity';
import { SubOrderEntity } from './entities/sub-order.entity';
import { OrderController, SubOrderController } from './order.controller';
import { OrderService, SubOrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, SubOrderEntity]),
    DriverModule,
  ],
    controllers: [OrderController, SubOrderController],
    providers: [OrderService, SubOrderService],
    exports: [OrderService, SubOrderService],
})
export class OrderModule {}
