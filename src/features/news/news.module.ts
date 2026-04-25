import { Module } from '@nestjs/common';
import { NewsAdminService } from './services/news.admin.service';
import { NewsControllerAdmin } from './controllers/news.controller.admin';
import { NewsPublicService } from './services/news.public.service';
import { NewsControllerPublic } from './controllers/news.controller.public';
import { NewsAdminRepository } from './repositories/news.admin.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsAdminService, NewsPublicService, NewsAdminRepository],
  controllers: [NewsControllerAdmin, NewsControllerPublic],
})
export class NewsModule {}
