import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { PrismaService } from '@/module/prisma/prisma.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async validate(email: string, password: string) {
    const user = await this.prisma.user.findFirst({ where: { email } })
    if (!user)
      throw new UnauthorizedException({ message: '用户不存在' })
    if (user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    else { throw new BadRequestException({ message: '密码错误' }) }
  }
}
