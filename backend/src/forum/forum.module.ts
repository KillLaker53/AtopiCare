import { Module } from '@nestjs/common';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { MongodbConnectionModule } from '../mongodb_connection/mongodb_connection.module';
import { ThreadSchema } from '../schema/thread.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostgresqlConnectionModule } from '../postgresql_connection/postgresql_connection.module';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
=======
>>>>>>> dcc418dbe7d0e116c8df53d4177c1786160860cc

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
<<<<<<< HEAD
    TypeOrmModule.forFeature([User]),
=======
>>>>>>> dcc418dbe7d0e116c8df53d4177c1786160860cc
  ],
  controllers: [ForumController],
  providers: [ForumService],
})
export class ForumModule {}
