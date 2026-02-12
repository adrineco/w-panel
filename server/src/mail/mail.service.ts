import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST', 'smtp.gmail.com'),
      port: this.configService.get('MAIL_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  async sendPasswordReset(email: string, token: string): Promise<void> {
    const resetUrl = `${this.configService.get('FRONTEND_URL', 'http://localhost:5173')}/reset-password?token=${token}`;

    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM', 'noreply@wpanel.com'),
        to: email,
        subject: 'Recuperação de Senha - W-Panel',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Recuperação de Senha</h2>
            <p>Você solicitou a recuperação de senha para sua conta.</p>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3fb1a3; color: white; text-decoration: none; border-radius: 5px;">
              Redefinir Senha
            </a>
            <p>Este link expira em 1 hora.</p>
            <p>Se você não solicitou esta recuperação, ignore este email.</p>
          </div>
        `,
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      // Em produção, você pode querer registrar isso ou lidar de outra forma
    }
  }
}
