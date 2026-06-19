import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const emailUser = this.configService.get<string>('EMAIL_USER', '');
    const emailPass = this.configService.get<string>('EMAIL_PASSWORD', '');

    // Only create real transporter if credentials are configured
    if (emailUser && emailPass && !emailUser.includes('your_gmail')) {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get<string>('EMAIL_HOST', 'smtp.gmail.com'),
        port: this.configService.get<number>('EMAIL_PORT', 587),
        secure: false,
        auth: { user: emailUser, pass: emailPass },
      });
    } else {
      this.logger.warn(
        'EMAIL_USER / EMAIL_PASSWORD not configured — email sending is disabled. ' +
        'Set these in .env.development to enable real emails.',
      );
      this.transporter = null as unknown as nodemailer.Transporter;
    }
  }

  async sendPasswordResetEmail(
    toEmail: string,
    resetToken: string,
  ): Promise<void> {
    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;
    const fromAddress = this.configService.get<string>(
      'EMAIL_FROM',
      'no-reply@ignita.app',
    );

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Ignita" <${fromAddress}>`,
      to: toEmail,
      subject: 'Reset Your Ignita Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background:#09090b;font-family:'Segoe UI',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="560" cellpadding="0" cellspacing="0" style="background:#18181b;border:1px solid #27272a;border-radius:16px;overflow:hidden;max-width:560px;width:100%;">

                    <!-- Header -->
                    <tr>
                      <td style="padding:32px 40px 24px;border-bottom:1px solid #27272a;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          <div style="width:36px;height:36px;background:linear-gradient(135deg,#10b981,#14b8a6);border-radius:8px;display:inline-block;"></div>
                          <span style="font-size:20px;font-weight:700;color:#fff;vertical-align:middle;margin-left:10px;">Ignita</span>
                        </div>
                      </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                      <td style="padding:32px 40px;">
                        <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#fff;">Reset your password</h1>
                        <p style="margin:0 0 24px;font-size:15px;color:#a1a1aa;line-height:1.6;">
                          We received a request to reset the password for your Ignita account. Click the button below to choose a new password. This link expires in <strong style="color:#fff;">15 minutes</strong>.
                        </p>

                        <!-- CTA Button -->
                        <div style="text-align:center;margin:0 0 24px;">
                          <a href="${resetLink}"
                            style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#059669,#0d9488);color:#fff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;letter-spacing:0.01em;">
                            Reset Password
                          </a>
                        </div>

                        <p style="margin:0 0 8px;font-size:13px;color:#71717a;">
                          Or copy and paste this link into your browser:
                        </p>
                        <p style="margin:0 0 24px;font-size:12px;color:#10b981;word-break:break-all;">
                          ${resetLink}
                        </p>

                        <div style="padding:16px;background:#27272a;border-radius:8px;border-left:3px solid #10b981;">
                          <p style="margin:0;font-size:13px;color:#a1a1aa;line-height:1.5;">
                            If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                          </p>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:20px 40px;border-top:1px solid #27272a;text-align:center;">
                        <p style="margin:0;font-size:12px;color:#52525b;">
                          © ${new Date().getFullYear()} Ignita. All rights reserved.
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      text: `Reset your Ignita password\n\nClick the link below to reset your password (expires in 15 minutes):\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
    };

    // If no transporter configured, log a warning and skip sending
    if (!this.transporter) {
      this.logger.warn(
        `[DEV] Email not sent to ${toEmail} — SMTP not configured. ` +
        `Reset link: ${resetLink}`,
      );
      return;
    }

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Password reset email sent to ${toEmail}`);
    } catch (error) {
      // Log the error but do NOT re-throw — a broken SMTP config should never
      // crash the forgot-password endpoint or reveal whether an email exists.
      this.logger.error(
        `Failed to send password reset email to ${toEmail}`,
        error,
      );
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch {
      return false;
    }
  }
}
