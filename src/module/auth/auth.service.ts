import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import { LoginDto } from './dto/loginDto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })
    if (!user)
      return null
    const isMatch = await verify(password, user.password)
    if (!isMatch)
      return null
    return user
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.emial,
      },
    })
    return {
      token: await this.token({ id: user.id, email: user.email }),
      user,
    }
  }

  async token({ id, email }) {
    return {
      token: await this.jwt.signAsync({
        email,
        sub: id,
      }),
    }
  }
}
