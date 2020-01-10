import * as path from 'path';
import * as packageJson from '../package.json';

export const INFO = {
  name: packageJson.name,
  version: packageJson.version,
  author: packageJson.author,
  site: 'https://onwl007.com',
  github: 'https://github.com/onwl007',
  homepage: '',
  issues: '',
  powered: [
    'Vue',
    'Nuxt.js',
    'nestjs',
    'Nodejs',
    'MongoDB',
    'Express',
    'Nginx',
    'Redis',
  ],
};

export const CROSS_DOMAIN = {
  allowedOrigins: ['https://onwl007.com', 'https://admin.onwl007.com'],
  allowedHeaders: [
    'Origin',
    'Accept',
    'Authorization',
    'No-Cache',
    'X-Requested-With',
    'Content-Type',
    'Cache-Control',
  ],
  allowedMethods: ['PUT', 'POST', 'GET', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedReferer: 'onwl007.me',
};
