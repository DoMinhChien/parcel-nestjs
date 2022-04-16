import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BaseFilerDto } from '../shared/model/base.filter.dto';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Get()
  getDrivers(@Query() filter :BaseFilerDto) {
    return this.driverService.getAllDrivers(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.driverService.delete(id);
  }
}
