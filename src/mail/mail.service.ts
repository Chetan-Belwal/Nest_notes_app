import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SharedNotesModel } from '../database/models/shared.notes.model';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  public async sendUserDeleteConfirmation(userAndNoteInfo: SharedNotesModel) {
    console.log('message', userAndNoteInfo.receiver['email']);
    return this.mailService.sendMail({
      to: userAndNoteInfo.receiver['email'],
      subject: 'Eventual Deletion Of Note BY AUTHOR',

      context: {
        receiver: userAndNoteInfo.receiver['name'],
        title: userAndNoteInfo.notes['title'],
        content: userAndNoteInfo.notes['content'],
        sender: userAndNoteInfo.sender['name'],
      },
      template: './deletionInfoMail',
    });
  }
}
