import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { prismaModule } from './shared/configs/prisma/prisma.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [AuthModule, prismaModule, CategoriesModule],
})
export class AppModule{}