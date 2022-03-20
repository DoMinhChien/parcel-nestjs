import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  
    async create(userData: CreateUserDto) {
   //  const stripeCustomer = await this.stripeService.createCustomer(userData.name, userData.email);
  
   userData.id = uuidv4();
      const newUser = await this.usersRepository.create({
        ...userData,
       // stripeCustomerId: stripeCustomer.id
      });
      await this.usersRepository.save(newUser);
      return newUser;
    }
    getAllUsers() {
      return this.usersRepository.find();
    }

    async getUserById(id: string) {
      const user = await this.usersRepository.findOne(id);
      return user ? user : null;
    }
  

    async updateUser(id: string, user: UpdateUserDto) {
      await this.usersRepository.update(id, user);
      const updatedUser = await this.usersRepository.findOne(id);
      if (updatedUser) {
        return updatedUser;
      }
  
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    async getByEmail(email: string) {
      const user = await this.usersRepository.findOne({ email });
      if (user) {
        return user;
      }
      throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }
    async deleteUser(id: number) {
      const deletedUser = await this.usersRepository.delete(id);
      if (!deletedUser.affected) {
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }
    }
}
