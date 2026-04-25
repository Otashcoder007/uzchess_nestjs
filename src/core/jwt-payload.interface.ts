import { Role } from './enums/role.enum';

export interface JwtPayload {
  id: number;
  login: string;
  role: Role;
}
