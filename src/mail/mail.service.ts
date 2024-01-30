import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { NoteModel } from 'src/database/models/note.model';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  public async sendUserDeleteConfirmation(
    user: User,
    noteInfo: Pick<NoteModel, 'title' | 'content'>,
  ) {
    await this.mailService.sendMail({
      to: user.email,
      subject: 'Eventual Deletion Of Note By Sender',
      context: {
        name: user.name,
        title : noteInfo.title,
        content : noteInfo.content,
        sender : "User"
      },
      template: './deletionInfoMail',
    });
  }
}
