import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  public async sendUserDeleteConfirmation(userAndNoteInfo :any) {
    console.log("message",userAndNoteInfo)
    await this.mailService.sendMail({
      to: 'Test@gmail.com',
      subject: 'Eventual Deletion Of Note By Sender',

      context: {
        receiver: userAndNoteInfo.receiverName,
        title:  userAndNoteInfo.title,
        content:  userAndNoteInfo.content,
        sender:  userAndNoteInfo.senderName,
      },
      template: './deletionInfoMail',
    });
  }
}
