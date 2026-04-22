import { Module } from '@nestjs/common';
import { AuthorAdminService } from './services/author/author.admin.service';
import { DifficultyAdminService } from './services/difficulty/difficulty.admin.service';
import { LanguageAdminService } from './services/language/language.admin.service';
import { LanguagePublicService } from './services/language/language.public.service';
import { AuthorAdminController } from './controllers/author/author.admin.controller';
import { DifficultyAdminController } from './controllers/difficulty/difficulty.admin.controller';
import { LanguageAdminController } from './controllers/language/language.admin.controller';
import { LanguagePublicController } from './controllers/language/language.public.controller';

@Module({
  providers: [AuthorAdminService, DifficultyAdminService, LanguageAdminService, LanguagePublicService],
  controllers: [
    AuthorAdminController,
    DifficultyAdminController,
    LanguageAdminController,
    LanguagePublicController,
  ],
})
export class CommonModule {}
