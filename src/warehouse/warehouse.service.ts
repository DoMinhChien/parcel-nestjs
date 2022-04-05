import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { v4 as uuidv4 } from 'uuid';
import { WarehouseEntity } from './entities/warehouse.entity';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(WarehouseEntity)
    private warehousesRepository: Repository<WarehouseEntity>,
  ) {}
  
    async create(userData: CreateWarehouseDto) {
      userData.id = uuidv4();
      const newUser = await this.warehousesRepository.create({
        ...userData,
       // stripeCustomerId: stripeCustomer.id
      });
      await this.warehousesRepository.save(newUser);
      return newUser;
    }
    
    async getAllWarehouses() {
      const allWarehouses = await this.warehousesRepository.find();
      return allWarehouses ? allWarehouses : null;
    }

    async getWarehouseById(id: string) {
      const user = await this.warehousesRepository.findOne(id);
      return user ? user : null;
    }
  
    async updateWarehouse(id: string, user: UpdateWarehouseDto) {
      await this.warehousesRepository.update(id, user);
      const updatedUser = await this.warehousesRepository.findOne(id);
      if (updatedUser) {
        return updatedUser;
      }
  
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    async deleteWarehouse(id: number) {
      const deletedUser = await this.warehousesRepository.delete(id);
      if (!deletedUser.affected) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
    }
}
