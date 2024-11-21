import { FetchRecentQuestionController } from '@/infra/http/controllers/fetch-recent-question.controller'
import { Module } from '@nestjs/common'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { AuthenticationController } from '@/infra/http/controllers/authentication.controller'
import { QuestionController } from '@/infra/http/controllers/create-question.controller'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@/infra/database/prisma/Database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticationController,
    QuestionController,
    FetchRecentQuestionController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
