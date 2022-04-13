import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {LocalAuthenticationGuard }from '../auth/localAuthentication.guard';
import { CreateDriverDto } from './dto/create-driver.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createDriverDto: CreateVehicleDto) {
    return this.vehicleService.create(createDriverDto);
  }
  @UseGuards(LocalAuthenticationGuard)
  @Get()
  findAll() {
    return this.vehicleService.getAllVehicles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
  //   return this.vehicleService.update(+id, updateDriverDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vehicleService.remove(+id);
  // }
}
