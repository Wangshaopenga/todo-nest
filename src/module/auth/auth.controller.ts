import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Role } from '../common/role'
import { AuthService } from './auth.service'
import { Auth } from './decorator/auth.decorator'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/uptate-user-dto'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.auth.login(createUserDto)
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.auth.register(createUserDto)
  }

  @Get(':id')
  @Auth(Role.admin)

  findOne(@Param('id') id: string) {
    return this.auth.findOne(+id)
  }

  @Get()
  @Auth(Role.admin)
  findAll() {
    return this.auth.findAll()
  }

  @Delete(':id')
  @Auth(Role.admin)
  remove(@Param('id') id: string) {
    return this.auth.remove(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.auth.update(+id, updateUserDto)
  }
}

