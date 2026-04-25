import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from '../dtos/user/public/sign-up.dto';
import { SignInDto } from '../dtos/user/public/sign-in.dto';
import { VerifyOtpDto } from '../dtos/user/public/verify-otp.dto';
import { ResendOtpDto } from '../dtos/user/public/resend-otp.dto';
import { SetPasswordDto } from '../dtos/user/public/set-password.dto';
import { AuthenticationPublicService } from '../services/authentication.public.service';

@Controller('auth')
export class AuthenticationPublicController {
  constructor(private readonly authService: AuthenticationPublicService) {}

  @Post('sign-up')
  async signUp(@Body() payload: SignUpDto) {
    return await this.authService.signUp(payload);
  }

  @Post('sign-in')
  async signIn(@Body() payload: SignInDto) {
    return await this.authService.signIn(payload);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() payload: VerifyOtpDto) {
    return await this.authService.verifyOtp(payload);
  }

  @Post('resend-otp')
  async resendOtp(@Body() payload: ResendOtpDto) {
    return await this.authService.resendOtp(payload);
  }

  @Post('set-password')
  async setPassword(@Body() payload: SetPasswordDto) {
    return await this.authService.setPassword(payload);
  }
}
