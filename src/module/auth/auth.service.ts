import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { Role } from '../common/role'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user-dto'
import { UpdateUserDto } from './dto/uptate-user-dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user)
      throw new BadRequestException({ message: '用户不存在' })
    const isMatch = await verify(user.password, pass)
    if (!isMatch)
      throw new BadRequestException({ message: '密码错误' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user
    return result
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto.email, dto.password)
    const token = await this.token({ id: user.id })
    return {
      user,
      ...token,
    }
  }

  async register(dto: CreateUserDto) {
    const isExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    if (isExist)
      throw new BadRequestException({ message: '邮箱已经注册' })
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
        role: Role.user,
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user
    return {
      user: result,
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    if (!user)
      return []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user
    return result
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async remove(id: number) {
    const isExist = await this.prisma.user.findUnique({ where: { id } })
    if (!isExist)
      throw new BadRequestException({ message: '用户不存在' })
    const user = await this.prisma.user.delete({ where: { id } })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user
    return result
  }

  async update(id: number, dto: UpdateUserDto) {
    const isExist = await this.prisma.user.findUnique({ where: { id } })
    if (!isExist)
      throw new BadRequestException({ message: '用户不存在' })
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        nickname: dto.nickname,
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user
    return result
  }

  async token({ id }) {
    return {
      token: await this.jwt.signAsync({
        sub: id,
      }),
    }
  }
}
