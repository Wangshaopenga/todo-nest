import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../guard/roles.guard'
import { Role } from '../../common/role'

export const Auth = (...roles: Role[]) => {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt'), RolesGuard))
}
