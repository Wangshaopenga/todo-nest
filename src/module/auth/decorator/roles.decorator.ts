import { SetMetadata } from '@nestjs/common'
import { Role } from '../../common/role'

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)
