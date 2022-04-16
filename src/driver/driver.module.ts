import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DriverEntity } from './entities/driver.entity';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity, VehicleEntity]),
  AuthModule],
  controllers: [DriverController, VehicleController],
  providers: [DriverService, VehicleService],
  exports: [DriverService, VehicleService]
})
export class DriverModule {}
