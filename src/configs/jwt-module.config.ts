import 'dotenv/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: '30d',
  },
};
