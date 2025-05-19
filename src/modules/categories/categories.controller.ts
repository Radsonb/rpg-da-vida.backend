import { Controller,  Post, Body, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser('userUuid') userUuid: string
  ) {
    return this.categoriesService.create(userUuid, createCategoryDto);
  }

  @Get()
  index(
    @GetUser('userUuid') userUuid: string
  ) {
    return this.categoriesService.index(userUuid)
  }

  @Get(':uuid')
  show(
    @Param('uuid') uuid: string,
    @GetUser('userUuid') userUuid: string
  ) {
    return this.categoriesService.show(userUuid, uuid)
  }

  @Delete(':uuid')
  destroy(
    @Param('uuid') uuid: string,
    @GetUser('userUuid') userUuid: string
  ) {
    return this.categoriesService.destroy(uuid, userUuid)
  }
}
