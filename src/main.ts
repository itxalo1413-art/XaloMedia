import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { AppModule } from './app.module';
import hbs from 'hbs';
import helmet from 'helmet';
import { HttpLoggingInterceptor } from './common/interceptors/http-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Security headers
  app.use(helmet());

  // Global validation pipe (uses class-validator DTOs)
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  // Basic HTTP logging (JSON) with requestId correlation
  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  // CORS — read from ALLOWED_ORIGINS env var in production
  // Automatically allows *.vercel.app, xalomedia.vn domains, and localhost
  const configuredOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        configuredOrigins.includes(origin) ||
        /^https:\/\/[a-zA-Z0-9_.-]+\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*xalomedia\.vn$/.test(origin);

      callback(null, isAllowed);
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Global API prefix
  app.setGlobalPrefix('api');

  // Static assets + HBS views (legacy)
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  await app.listen(process.env.PORT ?? 3005);
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT ?? 3005}/api`);
}
bootstrap();
