import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDriverDto } from './dto/create-driver.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { VehicleEntity } from './entities/vehicle.entity';

@Injectable()
export class DriverService {
  
  constructor(  @InjectRepository(VehicleEntity)
  private vehicleRepository: Repository<VehicleEntity>) {
    
  }
  create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new driver';
  }

  findAll() {
    return `This action returns all driver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }


 async createVechile(createVehicleDto : CreateVehicleDto)
  {
    return '' ;
  }
}
