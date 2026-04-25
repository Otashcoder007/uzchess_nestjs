import { Module } from '@nestjs/common';
import { AuthenticationAdminService } from './services/authentication.admin.service';
import { OtpCodePublicService } from './services/otp-code.public.service';
import { AuthenticationAdminController } from './controllers/authentication.admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpCode } from './entities/otp-code.entity';
import { User } from './entities/user.entity';

@Module({
  controllers: [AuthenticationAdminController],
  //@ts-ignore
  imports: [TypeOrmModule.forRoot([User, OtpCode])],
  providers: [AuthenticationAdminService, OtpCodePublicService],
})
export class AuthenticationModule {}
