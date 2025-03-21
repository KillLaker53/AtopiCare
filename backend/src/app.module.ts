import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ForumModule } from './forum/forum.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { PostgresqlConnectionModule } from './postgresql_connection/postgresql_connection.module';
import { MongodbConnectionModule } from './mongodb_connection/mongodb_connection.module';
import { ImageModule } from './image.module';
import { MulterModule } from '@nestjs/platform-express';
import { UvApiModule } from './uv_api/uv_api.module';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
    PostgresqlConnectionModule,
    MongodbConnectionModule,
    ForumModule,
    ImageModule,
    MulterModule.register({
       dest: './uploads',
    }),
    UvApiModule, 
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
