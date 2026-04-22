import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {LanguagePublicService} from "../../services/language/language.public.service";

@ApiTags('Language - Public')
@Controller('public/language')
export class LanguagePublicController {
  constructor(private readonly service: LanguagePublicService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }
}
