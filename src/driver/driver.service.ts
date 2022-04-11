import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDriverDto } from './dto/create-driver.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { v4 as uuidv4 } from 'uuid';
import { DriverEntity } from './entities/driver.entity';

@Injectable()
export class DriverService {
  
  constructor(  @InjectRepository(DriverEntity)
  private driverRepository: Repository<DriverEntity>) {
    
  }
  async create(driverData: CreateDriverDto) {
    driverData.id = uuidv4();
    console.log(driverData);
    const newDriver = this.driverRepository.create({
      ...driverData,
    });
    await this.driverRepository.save(newDriver);
    return newDriver;
  }

  async findAll() {
    const allDrivers = await this.driverRepository.find();
    return allDrivers ? allDrivers : null;
  }

  async findByIds(ids: string[]) {
    const allDrivers = await this.driverRepository.findByIds(ids);
    return allDrivers ? allDrivers : null;
  }

  async findOne(id: number) {
    const driver = await this.driverRepository.findOne(id);
    return driver ? driver : null;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    await this.driverRepository.update(id, updateDriverDto);
    const updatedOrder = await this.driverRepository.findOne(id);
    if (updatedOrder) {
      return updatedOrder;
    }

    throw new HttpException('driver not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: number) {
    const deletedDriver = await this.driverRepository.delete(id);
    if (!deletedDriver.affected) {
      throw new HttpException('driver not found', HttpStatus.NOT_FOUND);
    }
  }


 async createVechile(createVehicleDto : CreateVehicleDto)
  {
    return '' ;
  }
}
