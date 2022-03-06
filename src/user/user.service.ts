import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: CreateUserDto[] = [];
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() : CreateUserDto[]{
    var user = new CreateUserDto("user1","minh.nguyen1505@gmail.com","minhlol","123456789","018");
    this.users.push(user);
    return this.users;
    // return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
