import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto, CreateSubOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
export class UpdateSubOrderDto extends PartialType(CreateSubOrderDto) {}
