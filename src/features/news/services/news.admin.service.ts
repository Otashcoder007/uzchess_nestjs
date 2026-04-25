import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { News } from '../entities/news.entity';
import { NewsCreateAdminDto } from '../dtos/news/admin/news.create.admin.dto';
import { NewsUpdateAdminDto } from '../dtos/news/admin/news.update.admin.dto';
import { NewsListAdminDto } from '../dtos/news/admin/news.list.admin.dto';
import { NewsFilter } from '../filter/news.filter';
import { NewsDetailAdminDto } from '../dtos/news/admin/news.detail.admin.dto';
import {NewsAdminRepository} from "../repositories/news.admin.repository";

@Injectable()
export class NewsAdminService {
  constructor(private readonly repo: NewsAdminRepository) {}

  async create(payload: NewsCreateAdminDto, image: Express.Multer.File): Promise<News> {
    let newNews = News.create({ ...payload, image: image.path });
    await this.repo.save(newNews);
    return newNews;
  }

  async update(id: number, payload: NewsUpdateAdminDto) {
    let news = await this.repo.getOneById(id);
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    Object.assign(news, Object.fromEntries(Object.entries(payload).filter(([key, value]) => value != null)));
    return await this.repo.save(news);
  }

  async getAll(filters: NewsFilter) {
    let news = await this.repo.getAll(filters);
    news.data = plainToInstance(NewsListAdminDto, news.data, { excludeExtraneousValues: true });
    return news;
  }

  async getOne(id: number) {
    let news = await this.repo.getOneById(id);
    if (!news) {
      throw new NotFoundException('News with given id not found');
    }
    return plainToInstance(NewsDetailAdminDto, news, { excludeExtraneousValues: true });
  }

  async delete(id: number) {
    let news = await this.repo.getOneById(id);
    if (!news) {
      throw new NotFoundException('Does not exist');
    }

    return await this.repo.delete(news);
  }
}
