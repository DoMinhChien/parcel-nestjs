export class CreateWarehouseDto {
  public id: string;
  public name: string;
  public address: string;
  constructor(id: string, name: string, address: string);
  constructor(id: string, name: string, address: string) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
