import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService, SubOrderService } from './order.service';
import { CreateOrderDto, CreateSubOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, UpdateSubOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const result = await this.orderService.create(createOrderDto);
    return result;
  }

  @Get()
  getOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {
    return this.orderService.updateOrder(id, order);
  }

  //delete order
  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    this.orderService.deleteOrder(Number(id));
  }
}

@Controller('suborder')
export class SubOrderController {
  constructor(private readonly subOrderService: SubOrderService) {}

  @Post()
  async create(@Body() createSubOrderDto: CreateSubOrderDto) {
    const result = await this.subOrderService.create(createSubOrderDto);
    return result;
  }

  @Get()
  getSubOrders() {
    return this.subOrderService.getAllSubOrders();
  }

  @Get(':id')
  getSubOrderById(@Param('id') id: string) {
    return this.subOrderService.getSubOrderById(id);
  }

  @Patch(':id')
  async updateSubOrder(
    @Param('id') id: string,
    @Body() order: UpdateSubOrderDto,
  ) {
    return this.subOrderService.updateSubOrder(id, order);
  }

  //delete suborder
  @Delete(':id')
  async deleteSubOrder(@Param('id') id: string) {
    this.subOrderService.deleteSubOrder(Number(id));
  }
}
