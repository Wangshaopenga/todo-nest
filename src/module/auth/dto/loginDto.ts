import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsEmail({ message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  emial: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}
