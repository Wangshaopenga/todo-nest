import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from '../prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { jwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config) => {
      return {
        secret: config.get('TOKEN_SECRET'),
        signOptions: { expiresIn: '7d' },
      }
    },
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, jwtStrategy],

})
export class AuthModule {}
