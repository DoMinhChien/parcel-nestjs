import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './entities/driver.entity';
import { VehicleEntity } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity, VehicleEntity])],
  controllers: [DriverController, VehicleController],
  providers: [DriverService, VehicleService]
})
export class DriverModule {}
