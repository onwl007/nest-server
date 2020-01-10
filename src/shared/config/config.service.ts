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
