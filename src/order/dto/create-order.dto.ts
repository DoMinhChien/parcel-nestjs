import { DriverEntity } from "src/driver/entities/driver.entity";
import { UserEntity } from "src/user/entities/user.entity";

export class CreateOrderDto {
  public id: string;
  public status: number;
  public drivers: DriverEntity[];
  public driverIds: string[];
  public fee: number;
  public isDirectPickup: boolean;
  public isDirectDelivery: boolean;
  public description: string;
  public paymentSide: boolean;
  public paymentStatus: number;
  public totalWeight: number;
  public userId: string;
  public value: number;
  public srcWarehouseId: string;
  public destWarehouseId: string;
  orderData: Promise<DriverEntity[]>;
  constructor(id: string, status: number, drivers: DriverEntity[], fee: number, isDirectPickup: boolean, isDirectDelivery: boolean,
    description: string, paymentSide: boolean, paymentStatus: number, totalWeight: number, userId: string, value: number,
    srcWarehouseId: string, destWarehouseId: string);
  constructor(id: string, status: number, drivers: DriverEntity[], fee: number, isDirectPickup: boolean, isDirectDelivery: boolean,
    description: string, paymentSide: boolean, paymentStatus: number, totalWeight: number, userId: string, value: number,
    srcWarehouseId: string, destWarehouseId: string) {
    this.id = id;
    this.status = status;
    this.drivers = drivers;
    this.fee = fee;
    this.isDirectPickup = isDirectPickup;
    this.isDirectDelivery = isDirectDelivery;
    this.description = description;
    this.paymentSide = paymentSide;
    this.paymentStatus = paymentStatus;
    this.totalWeight = totalWeight;
    this.userId = userId;
    this.value = value;
    this.srcWarehouseId = srcWarehouseId;
    this.destWarehouseId = destWarehouseId;
  }
}

export class CreateSubOrderDto {
  public id: string;
  public status: number;
  public name: string;
  public weight: number;
  public orderId: string;
  constructor(id: string, status: number, name: string, weight: number, orderId: string);
  constructor(id: string, status: number, name: string, weight: number, orderId: string) {
    this.id = id;
    this.status = status;
    this.name = name;
    this.weight = weight;
    this.orderId = orderId;
  }
}