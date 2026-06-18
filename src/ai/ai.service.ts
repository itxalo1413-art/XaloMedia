import { Injectable, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private modelName: string;
  private temperature: number;
  private timeoutMs: number;
  private maxConcurrent: number;
  private inFlight = 0;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = this.configService.get<string>('GEMINI_MODEL') || 'gemini-2.5-flash';
    const temperatureRaw = this.configService.get<string>('GEMINI_TEMPERATURE') || '0.7';
    const temperature = Number(temperatureRaw);
    this.temperature = Number.isFinite(temperature) ? temperature : 0.7;

    const timeoutRaw = this.configService.get<string>('GEMINI_TIMEOUT_MS') || '20000';
    const timeoutMs = Number(timeoutRaw);
    this.timeoutMs = Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 20000;

    const maxConcurrentRaw = this.configService.get<string>('GEMINI_MAX_CONCURRENT') || '2';
    const maxConcurrent = Number(maxConcurrentRaw);
    this.maxConcurrent = Number.isFinite(maxConcurrent) && maxConcurrent > 0 ? Math.floor(maxConcurrent) : 2;
  }

  async generateArticle(prompt: string): Promise<string> {
    if (this.inFlight >= this.maxConcurrent) {
      throw new ServiceUnavailableException('AI is busy. Please retry in a moment.');
    }

    this.inFlight += 1;
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: {
          temperature: this.temperature,
        },
      });

      const systemPrompt = `You are a professional content writer.
Please generate an engaging, SEO-friendly article based on the following prompt/topic.
Return ONLY valid HTML content, starting with <h2> or <h3>, using <p>, <ul>, <li>, <strong> tags for formatting. Do NOT wrap it in \`\`\`html tags. Do NOT include <head> or <body> tags. Just the raw HTML elements that can be inserted directly into a CKEditor.`;

      const result = await this.withTimeout(
        model.generateContent(`${systemPrompt}\n\nPrompt/Topic: ${prompt}`),
        this.timeoutMs,
      );
      const response = await result.response;
      let text = response.text();
      
      // Clean up markdown codeblocks if model didn't follow instruction
      text = text.replace(/```html/g, '').replace(/```/g, '').trim();
      return text;
    } catch (error) {
      console.error('Error in generateArticle:', error);
      throw new InternalServerErrorException('Failed to generate content from AI');
    } finally {
      this.inFlight -= 1;
    }
  }

  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new ServiceUnavailableException('AI request timed out'));
      }, ms);
      promise
        .then((value) => resolve(value))
        .catch((err) => reject(err))
        .finally(() => clearTimeout(timer));
    });
  }
}

