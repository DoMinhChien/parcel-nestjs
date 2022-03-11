import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import {LoggerMiddleware } from './shared/Middleware/logger.middleware';


import {LoggerMiddleware } from './shared/middleware/logger.middleware';
>>>>>>> 7f1a2c8947f8a673b45a1aebb35fbef2150cc69f
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
  }
}
