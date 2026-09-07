import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enum/user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Extract required roles from the route handler or class metadata (set via @Roles)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If no roles are specified on the endpoint, allow public/unrestricted access
    if (!requiredRoles) {
      return true;
    }

    // 2. Extract user object attached to the request by JwtAuthGuard
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('user not authenticated');
    }

    // 3. Verify if user's role matches any of the required roles
    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRoles) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true; // Access granted
  }
}

