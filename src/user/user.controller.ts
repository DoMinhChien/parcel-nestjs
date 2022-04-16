import { Controller, Get, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseFilerDto } from '../shared/model/base.filter.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() filter :BaseFilerDto) {
    var result =  this.userService.getAllUsers(filter);
    return result;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }
}
