import * as Joi from 'joi';
import { EnvConfig } from './config.interface';

export class ConfigValidate {
  /** 确保设置了所有需要的变量，并返回经过验证的JavaScript对象，包括应用的默认值。 */
  static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(3000),
      // mongodb配置验证
      MONGODB_URI: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
