import { Injectable } from '@nestjs/common';
import { Report } from '../entities/report.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { BaseRepository } from '../../../core/repositories/base-repository';

@Injectable()
export class ReportRepository extends BaseRepository<Report> {
  constructor(
    @InjectRepository(Report)
    protected readonly repo: Repository<Report>,
    protected readonly config: ConfigService,
  ) {
    super();
  }
}
