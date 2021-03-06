import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import { BaseFilerDto } from '../shared/model/base.filter.dto';
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
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll(@Query() filter :BaseFilerDto) {
    return this.vehicleService.getAllVehicles(filter);
  }
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.vehicleService.update(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleService.delete(id);
  }
}
