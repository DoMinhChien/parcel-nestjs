import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { BaseFilerDto } from 'src/shared/model/base.filter.dto';
import { PagedItems } from 'src/shared/model/paged.items';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { RecipientEntity } from './entities/recipient.entity';

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(RecipientEntity)
    private recipientRepository: Repository<RecipientEntity>,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    request.user;
  }
  async create(recipientData: CreateRecipientDto) {
    recipientData.id = uuidv4();
    console.log(recipientData);
    const newRecipient = this.recipientRepository.create({
      ...recipientData,
    });
    await this.recipientRepository.save(newRecipient);
    return newRecipient;
  }

  async getAllRecipients(filter: BaseFilerDto) {
    const [items, count] = await this.recipientRepository.findAndCount({
      take: filter.pageSize,
      skip: filter.pageNumber,
    });
    return new PagedItems(filter.pageSize, filter.pageNumber, items, count);
  }

  async findByIds(ids: string[]) {
    const allRecipients = await this.recipientRepository.findByIds(ids);
    return allRecipients ? allRecipients : null;
  }

  async findOne(id: string) {
    const recipient = await this.recipientRepository.findOne(id);
    return recipient ? recipient : null;
  }

  async update(id: string, updateRecipientDto: UpdateRecipientDto) {
    await this.recipientRepository.update(id, updateRecipientDto);
    const updatedRecipient = await this.recipientRepository.findOne(id);
    if (updatedRecipient) {
      return updatedRecipient;
    }

    throw new HttpException('recipient not found', HttpStatus.NOT_FOUND);
  }

  async delete(id: string) {
    const deletedRecipient = await this.recipientRepository.delete(id);
    if (!deletedRecipient.affected) {
      throw new HttpException('recipient not found', HttpStatus.NOT_FOUND);
    }
  }
}
