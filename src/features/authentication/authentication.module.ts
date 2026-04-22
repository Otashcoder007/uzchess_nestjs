import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './services/authentication.service';
import { OtpCodeService } from './services/otp-code.service';
import { jwtModuleConfig } from '../../configs/jwt-module.config';
import { AuthenticationController } from './controllers/authentication.controller';

@Module({
  controllers: [AuthenticationController],
  imports: [JwtModule.register(jwtModuleConfig)],
  providers: [AuthenticationService, OtpCodeService],
})
export class AuthenticationModule {}
