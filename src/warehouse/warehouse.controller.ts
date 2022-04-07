import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { APIResponse } from '../shared/model/api.response';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    const result = await this.warehouseService.create(createWarehouseDto);
    return result;
  }

  @Get()
  getWarehouses() {
    return this.warehouseService.getAllWarehouses();
  }

  @Get(':id')
  getWarehouseById(@Param('id') id: string) {
    return this.warehouseService.getWarehouseById(id);
  }

  @Patch(':id')
  async updateWarehouse(
    @Param('id') id: string,
    @Body() warehouse: UpdateWarehouseDto,
  ) {
    return this.warehouseService.updateWarehouse(id, warehouse);
  }

  //delete warehouse
  @Delete(':id')
  async deleteWarehouse(@Param('id') id: string) {
    this.warehouseService.deleteWarehouse(Number(id));
  }
}
