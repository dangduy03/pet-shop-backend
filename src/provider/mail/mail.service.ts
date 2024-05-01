import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail, { Address } from 'nodemailer/lib/mailer';
import mailTemplate from './template/template';

@Injectable()
export class MailService {
    async mailTransport() {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "dangduynguyen03@gmail.com",
                pass: "aipnyojaobentwlj",
            },
        });

        return transporter;
    }

    async sendMail(
        recipients: Address[],
        subject: string,
        html?: string,
        from?: Address,
        pagram?: any,
        template?: any,
    ) {
        const transporter = await this.mailTransport();

        const options: Mail.Options = {
            from: from ?? {
                name: "PetShop",
                address: "dangduynguyen03@gmail.com",
            },
            to: recipients,
            subject,
            html: html ?? mailTemplate[template].render(pagram),
        };

        try {
            await transporter.sendMail(options);
        } catch (error) {
            console.log(error);
        }
    }
}
