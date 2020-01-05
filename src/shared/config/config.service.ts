/*
 * @Desc: 配置服务
 * @Author: onwl007 <https://github.com/onwl007>
 * @Date: 2020-01-05 00:19:27
 * @Last Modified by: onwl007
 * @Last Modified time: 2020-01-05 16:36:43
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { isDevMode } from '../../app.environment';

@Injectable()
export class ConfigService {
  private readonly config: { [x: string]: any };
  constructor() {
    const filePath: string = path.join(
      __dirname,
      `../../../${isDevMode ? 'development' : 'production'}.env`,
    );
    this.config = dotenv.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  }

  public getMongoConfig(): any {
    return {
      uri: this.config.MONGO_URI,
      username: this.config.MONGO_USERNAME,
      password: this.config.MONGO_PASSWORD,
    };
  }

  public get(key: string): string {
    return this.config[key] || '';
  }
}
