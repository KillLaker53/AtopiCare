import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForumModule } from './forum/forum.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { PostgresqlConnectionModule } from './postgresql_connection/postgresql_connection.module';
import { MongodbConnectionModule } from './mongodb_connection/mongodb_connection.module';
import { UvApiModule } from './uv_api/uv_api.module';

@Module({
  imports: [AuthenticationModule, UsersModule, PostgresqlConnectionModule, MongodbConnectionModule, ForumModule, UvApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
