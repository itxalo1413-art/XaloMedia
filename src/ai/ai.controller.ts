import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('v1/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('generate-article')
  async generateArticle(@Body('prompt') prompt: string) {
    if (!prompt) {
      return { success: false, message: 'Prompt is required' };
    }
    const html = await this.aiService.generateArticle(prompt);
    return { success: true, html };
  }
}

