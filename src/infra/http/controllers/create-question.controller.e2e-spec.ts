import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AppModule } from '../../app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

describe('Create questions (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get<PrismaService>(PrismaService)

    jwt = moduleRef.get<JwtService>(JwtService)

    await app.init()
  })

  test('[POST] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'jdoe@me.com',
        password: await hash('123456', 8),
      },
    })

    const access_token = await jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'Title test 1',
        content: 'This is a describe to content test 1',
      })

    expect(response.statusCode).toBe(201)

    const questionOnDataBase = await prisma.question.findFirst({
      where: {
        title: 'Title test 1',
      },
    })

    expect(questionOnDataBase).toBeTruthy()
  })
})
