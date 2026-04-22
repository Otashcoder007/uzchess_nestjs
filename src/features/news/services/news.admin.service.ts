import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { News } from '../entities/news.entity';
import { NewsCreateAdminDto } from '../dtos/news/admin/news.create.admin.dto';
import { NewsUpdateAdminDto } from '../dtos/news/admin/news.update.admin.dto';
import { NewsListAdminDto } from '../dtos/news/admin/news.list.admin.dto';
import { NewsDetailAdminDto } from '../dtos/news/admin/news.detail.admin.dto';

@Injectable()
export class NewsAdminService {
  async create(payload: NewsCreateAdminDto, image: Express.Multer.File): Promise<News> {
    let newNews = News.create({ ...payload, image: image.path });
    await News.save(newNews);
    return newNews;
  }

  async update(id: number, payload: NewsUpdateAdminDto): Promise<News> {
    let news = await News.findOneBy({ id });
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    Object.assign(news, Object.fromEntries(Object.entries(payload).filter(([key, value]) => value != null)));
    await News.save(news);
    return news;
  }

  async findAll(): Promise<NewsListAdminDto[]> {
    let news = await News.find();
    let data = plainToInstance(NewsListAdminDto, news, { excludeExtraneousValues: true });
    return data;
  }

  async findOne(id: number) {
    let news = await News.findOneBy({ id });
    let data = plainToInstance(NewsDetailAdminDto, news, { excludeExtraneousValues: true });
    return data;
  }

  async delete(id: number) {
    let news = await News.findOneBy({ id });
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    await News.remove(news);
  }
}
