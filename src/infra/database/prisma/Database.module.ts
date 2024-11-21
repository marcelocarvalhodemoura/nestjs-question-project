import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { PrismaQuestionRepository } from '@/infra/database/prisma/repositories/prisma-question-repository'
import { PrismaQuestionCommentsRepository } from '@/infra/database/prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-question-attachments-respository'
import { PrismaAnswerCommentsRepository } from '@/infra/database/prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentsRepository } from '@/infra/database/prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswersRepository } from '@/infra/database/prisma/repositories/prisma-answers-repository'

@Module({
  providers: [
    PrismaService,
    PrismaQuestionRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
  ],
  exports: [
    PrismaService,
    PrismaQuestionRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswersRepository,
  ],
})
export class DatabaseModule {}
