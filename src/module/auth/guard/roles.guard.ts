import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../role'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles)
      return true
    const { user } = context.switchToHttp().getRequest()
    console.log(user)
    return requiredRoles.includes(user.role)
  }
}