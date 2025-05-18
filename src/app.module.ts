import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { prismaModule } from './shared/configs/prisma/prisma.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';

@Module({
  imports: [AuthModule, prismaModule],
})
export class AppModule{}