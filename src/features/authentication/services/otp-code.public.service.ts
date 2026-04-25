import { BadRequestException, Injectable } from '@nestjs/common';
import {User} from "../entities/user.entity";
import {OtpType} from "../../../core/enums/otp-type.enum";
import {OtpCode} from "../entities/otp-code.entity";

@Injectable()
export class OtpCodePublicService {
  async sendOtp(user: User, type: OtpType) {
    await this.deleteOtps(user.id);

    let otpCode = OtpCode.create({
      userId: user.id,
      code: this.generateOtp(),
      type: type,
    });

    await OtpCode.save(otpCode);
    console.log(otpCode);
    // TODO: otpni haqiqiy send qilish shu yerda bo'ladi
  }

  async verifyOtp(userId: number, code: string) {
    let otpCode = await OtpCode.findOneBy({ userId: userId });

    if (!otpCode || otpCode.code !== code) {
      throw new BadRequestException('Codes do not match');
    }

    let otpExpire = Number(process.env.OTP_EXPIRE) * 1000; // millisekundda
    let difference = Date.now() - Date.parse(otpCode.created);
    if (difference > otpExpire) {
      throw new BadRequestException('Code expired');
    }

    return true;
  }

  private generateOtp(): string {
    let otpCode = Math.floor(Math.random() * 1_000_000).toString(10);
    let code: any[] = [];
    for (let i = 0; i < 6 - otpCode.length; i++) {
      code.push(0);
    }

    code.push(otpCode);

    return code.join();
  }

  private async deleteOtps(userId: number) {
    let otpCodes = await OtpCode.findBy({ userId });
    await OtpCode.remove(otpCodes);
  }
}
