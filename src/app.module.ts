import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './module/auth/auth.module'
import { PrismaModule } from './module/prisma/prisma.module'
import { TodoModule } from './module/todo/todo.module'
import { UploadModule } from './module/upload/upload.module'

@Module({
  imports: [AuthModule, TodoModule, ConfigModule.forRoot({
    isGlobal: true,
  }), PrismaModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
