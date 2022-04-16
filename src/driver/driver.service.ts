import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuidv4 } from 'uuid';
import { BaseFilerDto } from '../shared/model/base.filter.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverEntity } from './entities/driver.entity';
@Injectable()
export class DriverService {
  
  constructor(  @InjectRepository(DriverEntity)
  private driverRepository: Repository<DriverEntity>,
  @Inject(REQUEST) private readonly request: Request) {
    request.user;
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

  async getAllDrivers(filter: BaseFilerDto) {
    const allDrivers = await this.driverRepository.find(
      {relations: ['user'],
      take: filter.pageSize,
      skip: filter.pageNumber
    
    }
    
      );
    return allDrivers ? allDrivers : null;
  }

  async findByIds(ids: string[]) {
    const allDrivers = await this.driverRepository.findByIds(ids);
    return allDrivers ? allDrivers : null;
  }

  async findOne(id: string) {
    const driver = await this.driverRepository.findOne(id);
    return driver ? driver : null;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto) {
    await this.driverRepository.update(id, updateDriverDto);
    const updatedOrder = await this.driverRepository.findOne(id);
    if (updatedOrder) {
      return updatedOrder;
    }

    throw new HttpException('driver not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string) {
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
