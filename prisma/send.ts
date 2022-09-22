import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { Random } from 'mockjs'

const prisma = new PrismaClient()
async function run() {
  await prisma.user.create({
    data: {
      email: 'super@a.com',
      password: await hash('kkxx12'),
      role: 'admin',
    },
  })
  for (let i = 0; i < 20; i++) {
    await prisma.todo.create({
      data: {
        title: Random.ctitle(5, 10),
      },
    }).catch((err) => {
      console.log(err)
    })
  }
}
run()
