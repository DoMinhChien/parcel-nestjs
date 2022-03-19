import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
    async create(user: CreateUserDto) {
      try {
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
      } catch (e) {
        console.error(e)
        return null;
      }
    }

    getAllUsers() {
      return this.userRepository.find();
    }

    async getUserById(id: string) {
      const user = await this.userRepository.findOne(id);
      return user ? user : null;
    }
  

    async updateUser(id: string, user: UpdateUserDto) {
      await this.userRepository.update(id, user);
      const updatedUser = await this.userRepository.findOne(id);
      if (updatedUser) {
        return updatedUser;
      }
  
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  
    async deleteUser(id: number) {
      const deletedUser = await this.userRepository.delete(id);
      if (!deletedUser.affected) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
    }
}
