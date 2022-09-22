import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { PrismaService } from '@/module/prisma/prisma.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async validate({ sub: id }) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user
    return result
  }
}
