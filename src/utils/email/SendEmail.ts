import * as nodemailer from "nodemailer";
import EmailOptions from "./EmailOptions";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || "587"),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(emailOptions: EmailOptions) {
    try {
      await this.transporter.sendMail({
        from: emailOptions.from,
        to: emailOptions.to,
        subject: emailOptions.subject,
        text: emailOptions.text,
        html: emailOptions.html,
      });
      console.log("Email sent successfully");
    } catch (error) {
      throw new Error(`Error sending email: ${error}`);
    }
  }
}

export const emailService = new EmailService();
