import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/user/types/user.types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
