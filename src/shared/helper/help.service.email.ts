import * as nodemailer from 'nodemailer';
import { Logger } from 'winston';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { WINSTON_LOGGER_TOKEN } from '../../core/constants/system.constants';

export interface IEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private clientIsValid: boolean;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_LOGGER_TOKEN) private readonly logger: Logger,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      secure: true,
      port: 465,
      auth: {
        user: this.configService.get('EMAIL_ACCOUNT'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
    this.verifyClient();
  }

  private verifyClient(): void {
    return this.transporter.verify((error, success) => {
      if (error) {
        this.clientIsValid = false;
        setTimeout(this.verifyClient.bind(this), 1000 * 60 * 30);
        this.logger.warn(
          '邮件客户端初始化连接失败！将在半小时后重连: %o',
          error,
        );
      } else {
        this.clientIsValid = true;
        this.logger.info('邮件客户端初始化连接成功！随时可发送邮件');
      }
    });
  }

  /**
   * sendMail
   */
  public sendMail(mailOptions: IEmailOptions) {
    if (!this.clientIsValid) {
      this.logger.warn('邮件客户端初始化未成功，发送邮件被拒绝');
      return false;
    }
    const options = Object.assign(mailOptions, {
      from: this.configService.get('EMAIL_FROM'),
    });
    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        this.logger.warn('邮件发送失败! %o', error);
      } else {
        this.logger.info('邮件发送成功! %s %s', info.messageId, info.response);
      }
    });
  }
}
