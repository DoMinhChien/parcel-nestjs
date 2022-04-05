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
  
    async create(warehouseData: CreateWarehouseDto) {
      warehouseData.id = uuidv4();
      const newWarehouse = await this.warehousesRepository.create({
        ...warehouseData,
      });
      await this.warehousesRepository.save(newWarehouse);
      return newWarehouse;
    }
    
    async getAllWarehouses() {
      const allWarehouses = await this.warehousesRepository.find();
      return allWarehouses ? allWarehouses : null;
    }

    async getWarehouseById(id: string) {
      const warehouse = await this.warehousesRepository.findOne(id);
      return warehouse ? warehouse : null;
    }
  
    async updateWarehouse(id: string, warehouse: UpdateWarehouseDto) {
      await this.warehousesRepository.update(id, warehouse);
      const updatedWarehouse = await this.warehousesRepository.findOne(id);
      if (updatedWarehouse) {
        return updatedWarehouse;
      }
  
      throw new HttpException('warehouse not found', HttpStatus.NOT_FOUND);
    }

    async deleteWarehouse(id: number) {
      const deletedWarehouse = await this.warehousesRepository.delete(id);
      if (!deletedWarehouse.affected) {
        throw new HttpException('warehouse not found', HttpStatus.NOT_FOUND);
      }
    }
}
