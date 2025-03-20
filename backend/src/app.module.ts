import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForumModule } from './forum/forum.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ForumModule],
})
export class AppModule {}
