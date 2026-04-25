import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RolesKey } from '../decorators/roles.decorator';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride(RolesKey, [context.getHandler(), context.getClass()]);
    if (!roles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    let header: string | undefined;
    if (req.headers && req.headers.authorization) {
      header = req.headers.authorization;
    } else if (req.handshake && req.handshake.headers.authorization) {
      header = req.handshake.headers.authorization;
    }

    if (!header) {
      throw new UnauthorizedException('Credentials not found');
    }

    const [bearer, token] = header.split(' ');
    if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Wrong credentials format');
    }

    try {
      req.user = await this.jwtService.verify(token);
      return true;
    } catch (exc) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
