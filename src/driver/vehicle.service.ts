import { HttpException, HttpStatus, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm/repository/Repository';
import { v4 as uuidv4 } from 'uuid';
import { BaseFilerDto } from '../shared/model/base.filter.dto';
import { PagedItems } from '../shared/model/paged.items';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';





@Injectable({ scope: Scope.REQUEST })
export class VehicleService {
  currentUser: any;
  constructor(  @InjectRepository(VehicleEntity)
  private vehicleRepository: Repository<VehicleEntity>,
  @Inject(REQUEST) private readonly request: Request) {
    this.currentUser = request.user;
  }
  async create(vehicle: CreateVehicleDto) {
    const entity = this.vehicleRepository.create({
        id:uuidv4(),
        currentWeight: vehicle.currentWeight,
        totalWeight: vehicle.totalWeight,
        number : vehicle.number

    });
     await this.vehicleRepository.save(entity);
     return entity;
  }

  async getAllVehicles(filter: BaseFilerDto) {
    const [items, count] = await this.vehicleRepository.findAndCount(
      {take: filter.pageSize,
      skip: filter.pageNumber
    
    }
    
      );
      return new PagedItems(filter.pageSize, filter.pageNumber, items, count);

  }

  async getVehicleById(id: string) {
    const user = await this.vehicleRepository.findOne(id);
    return user ? user : null;
  }

  async update(id: string, user: UpdateVehicleDto) {
    await this.vehicleRepository.update(id, user);

    const updatedUser = await this.vehicleRepository.findOne(id);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }
  async delete(id: string) {
    const deletedUser = await this.vehicleRepository.delete(id);
    if (!deletedUser.affected) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }
}
