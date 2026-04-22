import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthenticationService } from '../services/authentication.service';
import { SignUpDto } from '../dtos/sign-up.dto';
import { ResendOtpDto } from '../dtos/resend-otp.dto';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { SetPasswordDto } from '../dtos/set-password.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

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
