import { encryptPassword } from '../common';

export const ConfigToken = 'ConfigToken';

export const ApplicationConfig = {
  initAdmin: {
      username: 'onwl007',
      name: 'onwl007',
      email: 'onwl007@126.com',
      avatar: 'https://github.com/onwl007/Markdown-Photos/blob/master/JavaScript-logo.png',
      site: 'www.onwl007.com',
      role: 'admin',
      password: encryptPassword('i am iron man'),
      mute: false,
  },
};
