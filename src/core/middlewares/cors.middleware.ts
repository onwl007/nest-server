import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CROSS_DOMAIN } from '../../app.config';
import { isDevMode } from '../../app.environment';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next) {
    const origins = request.headers.origin;
    const origin = (Array.isArray(origins) ? origins[0] : origins) || '';
    const { allowedOrigins, allowedHeaders, allowedMethods } = CROSS_DOMAIN;

    // Allow Origin
    if (!origin || allowedOrigins.includes(origin) || isDevMode) {
      response.setHeader('Access-Control-Allow-Origin', origin || '*');
    }

    // Headers
    response.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
    response.header('Access-Control-Allow-Methods', allowedMethods.join(','));
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.header('X-Powered-By', `NestServer`);

    return next();
  }
}
