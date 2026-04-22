import { Module } from '@nestjs/common';
import { NewsAdminService } from './services/news.admin.service';
import { NewsControllerAdmin } from './controllers/news.controller.admin';
import { NewsPublicService } from './services/news.public.service';
import { NewsControllerPublic } from './controllers/news.controller.public';

@Module({
  providers: [NewsAdminService, NewsPublicService],
  controllers: [NewsControllerAdmin, NewsControllerPublic],
})
export class NewsModule {}
