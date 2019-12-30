import * as path from 'path';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const loggerProvider = {
  provide: 'WINSTON_LOGGER',
  useFactory: () => {
    const logger = winston.createLogger({
      level: 'debug',
      transports: [
        new DailyRotateFile({
          level: 'error',
          dirname: path.join(__dirname, '../../../logs/error'),
          filename: 'error_%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          json: true,
          maxSize: '20m', // 10m
        }),
        new DailyRotateFile({
          level: 'info',
          dirname: path.join(__dirname, '../../../logs/info'),
          filename: 'info_%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          json: true,
          maxSize: '20m',
        }),
      ],
    });
    return logger;
  },
};
