import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import type { Request, Response } from 'express';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    const start = Date.now();
    const requestId = (req as any).requestId;
    const method = req.method;
    const path = req.originalUrl || req.url;

    return next.handle().pipe(
      tap({
        next: () => {
          const durationMs = Date.now() - start;
          const statusCode = res.statusCode;
          console.log(
            JSON.stringify({
              level: 'info',
              msg: 'http_request',
              requestId,
              method,
              path,
              statusCode,
              durationMs,
            }),
          );
        },
        error: (err) => {
          const durationMs = Date.now() - start;
          const statusCode = res.statusCode;
          console.error(
            JSON.stringify({
              level: 'error',
              msg: 'http_request_error',
              requestId,
              method,
              path,
              statusCode,
              durationMs,
              error: err instanceof Error ? err.message : String(err),
            }),
          );
        },
      }),
    );
  }
}

