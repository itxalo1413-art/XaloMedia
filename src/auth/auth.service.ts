import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') ?? '';

    if (loginDto.email !== adminEmail) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    // Support both bcrypt hash (starts with $2b$) and plain-text (legacy)
    const isHashed = adminPassword.startsWith('$2b$') || adminPassword.startsWith('$2a$');
    const passwordMatch = isHashed
      ? await bcrypt.compare(loginDto.password, adminPassword)
      : loginDto.password === adminPassword;

    if (!passwordMatch) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    const payload = { email: adminEmail, sub: 'admin-id', role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /** Utility: tạo bcrypt hash để lưu vào .env */
  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 12);
  }
}

