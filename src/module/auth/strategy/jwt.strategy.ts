import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '@/module/prisma/prisma.service'

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService, private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('TOKEN_SECRET'),
    })
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
