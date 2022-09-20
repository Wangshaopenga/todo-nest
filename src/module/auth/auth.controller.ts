import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { Roles } from './decorator/roles.decorator'
import { LoginDto } from './dto/loginDto'
import { RolesGuard } from './guard/roles.guard'
import { Role } from './role'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() body) {
    return this.auth.login(body)
  }

  @Get('info')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.user)
  getInfo(@Body() login: LoginDto) {
    return login
  }
}
