import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  async findManyByAnswerId(answerId: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
