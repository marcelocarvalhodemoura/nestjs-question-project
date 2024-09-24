import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '../pipes/zod-validation'
import { PrismaService } from '../prisma/prisma.service'
import { z } from 'zod'
import { compare } from 'bcryptjs'

const authenticateBodysSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateBodyInput = z.infer<typeof authenticateBodysSchema>

@Controller('/sessions')
export class AuthenticationController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodysSchema))
  async handle(@Body() body: AuthenticateBodyInput) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('User credentials invalid')
    }

    const isPasswordMatch = await compare(password, user.password)

    if (!isPasswordMatch) {
      throw new UnauthorizedException('User credentials invalid')
    }

    const accessToken = this.jwt.sign({ sub: user.id })
    return {
      access_token: accessToken,
    }
  }
}
