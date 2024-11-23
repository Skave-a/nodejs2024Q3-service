import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new LoggingService();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;
    this.logger.log(
      `Incoming request: ${method} ${url} - Query: ${JSON.stringify(
        query,
      )} - Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`Response: ${statusCode} for ${method} ${url}`);
    });

    next();
  }
}
