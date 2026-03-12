import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;
  private modelName: string;
  private temperature: number;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = this.configService.get<string>('GEMINI_MODEL') || 'gemini-2.5-flash';
    this.temperature = parseFloat(this.configService.get<string>('GEMINI_TEMPERATURE') || '0.7');
  }

  async generateArticle(prompt: string): Promise<string> {
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

      const result = await model.generateContent(`${systemPrompt}\n\nPrompt/Topic: ${prompt}`);
      const response = await result.response;
      let text = response.text();
      
      // Clean up markdown codeblocks if model didn't follow instruction
      text = text.replace(/```html/g, '').replace(/```/g, '').trim();
      return text;
    } catch (error) {
      console.error('Error in generateArticle:', error);
      throw new InternalServerErrorException('Failed to generate content from AI');
    }
  }
}

