import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation'
import { PrismaService } from '../prisma/prisma.service'
import { z } from 'zod'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user-decorator'
import { UserPayload } from '../auth/jwt.strategy'

const createQuestionsBodysSchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionsBodysSchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionsBodysSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub
    const slug = this.convertToSlug(title)

    try {
      await this.prisma.question.create({
        data: {
          title,
          content,
          slug,
          authorId: userId,
        },
      })
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Unauthorized')
    }
  }

  private convertToSlug(title: string) {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
  }
}
