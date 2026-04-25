import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './configs/env.config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/type-orm.config';
import { AuthenticationModule } from './features/authentication/authentication.module';
import { CommonModule } from './features/common/common.module';
import { CoursesModule } from './features/courses/courses.module';
import { LibraryModule } from './features/library/library.module';
import { NewsModule } from './features/news/news.module';
import { ReportsModule } from './features/reports/reports.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { RolesGuard } from './core/guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from './configs/jwt-module.config';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  imports: [
    CqrsModule.forRoot(),
    JwtModule.register(jwtModuleConfig),
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(configModuleOptions),
    AuthenticationModule,
    CoursesModule,
    CommonModule,
    LibraryModule,
    NewsModule,
    ReportsModule,
  ],
})
export class AppModule {}
