import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverService } from '../driver/driver.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto, CreateSubOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateSubOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import { SubOrderEntity } from './entities/sub-order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    // @InjectRepository(DriverEntity)
    // private driversRepository: Repository<DriverEntity>,
    private driverService: DriverService,
  ) {}

  async create(orderData: CreateOrderDto) {
    orderData.id = uuidv4();
    let driverIdList = orderData.driverIds;
    let drivers = await this.driverService.findByIds(driverIdList);
    orderData.drivers = drivers;
    const newOrder = this.ordersRepository.create({
      ...orderData,
    });
    await this.ordersRepository.save(newOrder);
    return newOrder;
  }

  async getAllOrders() {
    const allOrders = await this.ordersRepository.find({
      relations: ['drivers', 'subOrders', 'user', 'recipient']
    })
    return allOrders ? allOrders : null;
  }

  async getOrderById(id: string) {
    const order = await this.ordersRepository.findOne(id, {
      relations: ['drivers', 'subOrders', 'user', 'recipient']
    });
    return order ? order : null;
  }

  async updateOrder(id: string, order: UpdateOrderDto) {
    await this.ordersRepository.update(id, order);
    const updatedOrder = await this.ordersRepository.findOne(id);
    if (updatedOrder) {
      return updatedOrder;
    }

    throw new HttpException('order not found', HttpStatus.NOT_FOUND);
  }

  async deleteOrder(id: number) {
    const deletedOrder = await this.ordersRepository.delete(id);
    if (!deletedOrder.affected) {
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);
    }
  }
}


@Injectable()
export class SubOrderService {
  constructor(
    @InjectRepository(SubOrderEntity)
    private subOrdersRepository: Repository<SubOrderEntity>,
  ) {}

  async create(subOrderData: CreateSubOrderDto) {
    subOrderData.id = uuidv4();
    const newSubOrder = this.subOrdersRepository.create({
      ...subOrderData,
    });
    await this.subOrdersRepository.save(newSubOrder);
    return newSubOrder;
  }

  async getAllSubOrders() {
    const allSubOrders = await this.subOrdersRepository.find();
    return allSubOrders ? allSubOrders : null;
  }

  async getSubOrderById(id: string) {
    const subOrder = await this.subOrdersRepository.findOne(id);
    return subOrder ? subOrder : null;
  }

  async updateSubOrder(id: string, order: UpdateSubOrderDto) {
    await this.subOrdersRepository.update(id, order);
    const updatedSubOrder = await this.subOrdersRepository.findOne(id);
    if (updatedSubOrder) {
      return updatedSubOrder;
    }

    throw new HttpException('suborder not found', HttpStatus.NOT_FOUND);
  }

  async deleteSubOrder(id: number) {
    const deletedSubOrder = await this.subOrdersRepository.delete(id);
    if (!deletedSubOrder.affected) {
      throw new HttpException('suborder not found', HttpStatus.NOT_FOUND);
    }
  }
}