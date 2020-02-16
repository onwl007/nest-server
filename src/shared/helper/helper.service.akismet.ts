import { Logger } from 'winston';
import { AkismetClient } from 'akismet-api';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { WINSTON_LOGGER_TOKEN } from '../../core/constants/system.constants';

export interface IContent {
  user_ip: string;
  user_agent: string;
  referrer: string;
  permalink: string;
  comment_type?: 'comment';
  comment_author?: string;
  comment_author_email?: string;
  comment_author_url?: string;
  comment_content?: string;
  is_test?: boolean;
}

@Injectable()
export class AkismetService {
  private client: AkismetClient;
  private clientIsValid: boolean = false;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_LOGGER_TOKEN) private readonly logger: Logger,
  ) {
    // this.initClient();
    // this.initVerify();
  }

  // 初始化客户端
  private initClient(): void {
    this.client = new AkismetClient({
      key: this.configService.get('AKISMET_KEY'),
      blog: this.configService.get('AKISMET_BLOG'),
    });
  }

  private async initVerify(): Promise<void> {
    try {
      this.clientIsValid = await this.client.verifyKey();
      this.logger.info('Akismet key 有效，已准备好工作');
    } catch (error) {
      this.clientIsValid = false;
      setTimeout(this.initVerify.bind(this), 1000 * 60 * 30);
      this.logger.warn('Akismet 初始化连接失败! 无法工作: %o', error);
    }
  }

  /**
   * @description 检查 SPAM
   * @param content 提交内容
   */
  public async checkSpam(content: IContent): Promise<boolean> {
    if (!this.clientIsValid) {
      this.logger.warn('Akismet 初始化连接失败! 无法检查 SPAM');
      return false;
    }
    return this.client.checkSpam(content);
  }

  /**
   * @description 提交 SPAM
   * @param content 提交内容
   */
  public async submitSpam(content: IContent): Promise<void> {
    if (!this.clientIsValid) {
      this.logger.warn('Akismet 初始化连接失败! 无法提交 SPAM');
      return;
    }
    await this.client.submitSpam(content);
  }

  /**
   * @description 提交 HAM
   * @param content 提交内容
   */
  public async submitHam(content: IContent): Promise<void> {
    if (!this.clientIsValid) {
      this.logger.warn('Akismet 初始化连接失败! 无法提交 HAM');
      return;
    }
    await this.client.submitHam(content);
  }
}
