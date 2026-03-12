import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from './entities/level.entity';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }])],
  controllers: [LevelController],
  providers: [LevelService]
})
export class LevelModule {}
