// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendAccountDetails(email: string, accountNumber: string, accountType: string, balance: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your Bank Account is Activated!',
      template: './account', // templates/account.hbs
      context: {
        email,
        accountNumber,
        accountType,
        balance,
      },
    });
  }

  async sendPasswordResetLink(otp:string,email:string, accountNumber:string){
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      html: `Hello, Your otp is ${otp}`,
    });
    return "Otp sent"

  }
}
