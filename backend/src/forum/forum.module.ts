import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { MongodbConnectionModule } from '../mongodb_connection/mongodb_connection.module';
import { ThreadSchema } from '../schema/thread.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostgresqlConnectionModule } from '../postgresql_connection/postgresql_connection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';

@Module({
  imports: [
    MongodbConnectionModule,
    MongooseModule.forFeature([
      {
        name: 'Thread',
        schema: ThreadSchema,
        collection: 'threads',
      },
    ]),
    PostgresqlConnectionModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
