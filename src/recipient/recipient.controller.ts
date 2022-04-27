import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { BaseFilerDto } from 'src/shared/model/base.filter.dto';

@Controller('recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Post()
  create(@Body() createDriverDto: CreateRecipientDto) {
    return this.recipientService.create(createDriverDto);
  }

  @Get()
  getRecipients(@Query() filter :BaseFilerDto) {
    return this.recipientService.getAllRecipients(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto) {
    return this.recipientService.update(id, updateRecipientDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.recipientService.delete(id);
  }
}
