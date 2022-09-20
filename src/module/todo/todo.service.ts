import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: {
        title: createTodoDto.title,
      },
    })
    return todo
  }

  async findAll() {
    return await this.prisma.todo.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.todo.findFirst({ where: { id } })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.prisma.todo.update({
      where: { id },
      data: { title: updateTodoDto.title },
    })
    return todo
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({ where: { id } })
  }
}
