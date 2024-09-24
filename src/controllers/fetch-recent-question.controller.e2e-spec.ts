import { PrismaService } from '../prisma/prisma.service'
import { AppModule } from '../app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

describe('Fetch questions (E2E)', () => {
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

  test('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'jdoe@me.com',
        password: await hash('123456', 8),
      },
    })

    const access_token = await jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          title: 'Title test 1',
          content: 'This is a describe to content test 1',
          slug: 'title-test-1',
          authorId: user.id,
        },
        {
          title: 'Title test 2',
          content: 'This is a describe to content test 2',
          slug: 'title-test-2',
          authorId: user.id,
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toBe(200)
    // expect(response.body).toHaveLength(2)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({
          title: 'Title test 1',
        }),
        expect.objectContaining({
          title: 'Title test 2',
        }),
      ],
    })
  })
})
