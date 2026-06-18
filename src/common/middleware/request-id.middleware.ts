import { randomUUID } from 'crypto';
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headerValue = req.header('x-request-id');
    const requestId = headerValue && headerValue.trim().length > 0 ? headerValue : randomUUID();

    (req as any).requestId = requestId;
    res.setHeader('x-request-id', requestId);
    next();
  }
}

