import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: CreateUserDto[] =[
     {id: '1', address: 'HCM', email: 'minh.nguyen1505@gmail.com', password : 'minhlol',provinceCode:'012', phone :'123456789'},
     {id: '2', address: 'HCM', email: 'dominhchien206@gmail.com', password : 'chiendeptrai',provinceCode:'012', phone :'123456789'}
    ];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() : CreateUserDto[]{
    return this.users;
    // return `This action returns all user`;
  }

  findOne(id: string) {
  return this.users.find( x=> x.id = id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
