import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { SubOrderEntity } from './entities/suborder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, SubOrderEntity])],
//   controllers: [UserController],
//   providers: [UserService],
//   exports: [UserService]
})
export class OrderModule {}
