import * as path from 'path';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { WINSTON_LOGGER_TOKEN } from '../../core/constants/system.constants';

export const loggerProvider = {
  provide: WINSTON_LOGGER_TOKEN,
  useFactory: () => {
    const errorStackTracerFormat = winston.format(info => {
      if (info instanceof Error) {
        return Object.assign({}, info, {
          stack: info.stack,
          message: info.message,
        });
      }
      return info;
    });
    const colorizer = winston.format.colorize();
    const consoleFormat = winston.format.printf(info => {
      return colorizer.colorize(
        info.level,
        `[${info.label}] - ${info.timestamp} - [${info.level.toUpperCase()}]: ${
          info.message
        } ${info.stack ? JSON.stringify(info.stack) : ''}`,
      );
    });
    const logFormat = winston.format.combine(
      winston.format.label({ label: 'nest-server' }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errorStackTracerFormat(),
      winston.format.splat(),
      winston.format.simple(),
      process.env.NODE_ENV === 'production'
        ? winston.format.prettyPrint()
        : consoleFormat,
    );
    if (process.env.NODE_ENV !== 'production') {
      return winston.createLogger({
        format: logFormat,
        transports: [new winston.transports.Console()],
      });
    }
    const logger = winston.createLogger({
      format: logFormat,
      transports: [
        new DailyRotateFile({
          level: 'error',
          dirname: path.join(__dirname, '../../../logs/error'),
          filename: 'error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          json: true,
          maxSize: '20m', // 10m
          // maxFiles: '14d', // 保存时间
        }),
        new DailyRotateFile({
          level: 'info',
          dirname: path.join(__dirname, '../../../logs/info'),
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          json: true,
          maxSize: '20m',
          // maxFiles: '14d', // 保存时间
        }),
      ],
    });
    return logger;
  },
};
