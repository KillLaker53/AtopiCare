import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForumModule } from './forum/forum.module';
import { PostgresqlConnectionModule } from './postgresql_connection/postgresql_connection.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ForumModule, PostgresqlConnectionModule],
})
export class AppModule {}
