import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { userNoteInfo } from './userNoteInfo.interface';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  public async sendUserDeleteConfirmation(userAndNoteInfo:userNoteInfo ) {
    console.log('message', userAndNoteInfo);
      return this.mailService.sendMail({
      to: userAndNoteInfo.receiver.email,
      subject: 'Eventual Deletion Of Note BY AUTHOR',

      context: {
        receiver: userAndNoteInfo.receiver.name,
        title: userAndNoteInfo.notes.title,
        content: userAndNoteInfo.notes.content,
        sender: userAndNoteInfo.sender.name,
      },
      template: './deletionInfoMail',
    });
  }
}
