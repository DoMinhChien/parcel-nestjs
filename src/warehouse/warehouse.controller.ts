import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { APIResponse } from '../shared/model/api.response';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  async create(@Body() createUserDto: CreateWarehouseDto) {
    const result = await this.warehouseService.create(createUserDto);
    return result;
  }

  @Get()
  getUsers() {
    return this.warehouseService.getAllWarehouses();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.warehouseService.getWarehouseById(id);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() user: UpdateWarehouseDto) {
    return this.warehouseService.updateWarehouse(id, user);
  }

  //delete user
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.warehouseService.deleteWarehouse(Number(id));
  }
}
