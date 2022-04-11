import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDriverDto } from './dto/create-driver.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { VehicleEntity } from './entities/vehicle.entity';

import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class VehicleService {
  
  constructor(  @InjectRepository(VehicleEntity)
  private vehicleRepository: Repository<VehicleEntity>) {
    
  }
  async create(vehicle: CreateVehicleDto) {
      
    //userData.id = uuidv4();
    const entity = this.vehicleRepository.create({
        id:uuidv4(),
        currentWeight: vehicle.currentWeight,
        totalWeight: vehicle.totalWeight,
        number : vehicle.number

    });
     await this.vehicleRepository.save(entity);
     return entity;
  }

  getAllVehicles() {
    return this.vehicleRepository.find();
  }

  async getVehicleById(id: string) {
    const user = await this.vehicleRepository.findOne(id);
    return user ? user : null;
  }

//   async updateUser(id: string, user: UpdateUserDto) {
//     await this.vehicleRepository.update(id, user);

//     const updatedUser = await this.vehicleRepository.findOne(id);
//     if (updatedUser) {
//       return updatedUser;
//     }
//     throw new HttpException('user not found', HttpStatus.NOT_FOUND);
//   }

}
