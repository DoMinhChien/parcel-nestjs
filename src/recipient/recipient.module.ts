import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RecipientController } from './recipient.controller';
import { RecipientService } from './recipient.service';
import { RecipientEntity } from './entities/recipient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipientEntity]),
  AuthModule],
  controllers: [RecipientController],
  providers: [RecipientService],
  exports: [RecipientService]
})
export class RecipientModule {}
