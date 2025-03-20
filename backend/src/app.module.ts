import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { ForumModule } from './forum/forum.module';
import { PostgresqlConnectionModule } from './postgresql_connection/postgresql_connection.module';
=======
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { PostgresqlConnectionModule } from './postgresql_connection/postgresql_connection.module';
import { MongodbConnectionModule } from './mongodb_connection/mongodb_connection.module';
>>>>>>> dcc418dbe7d0e116c8df53d4177c1786160860cc

@Module({
  imports: [AuthenticationModule, UsersModule, PostgresqlConnectionModule, MongodbConnectionModule],
  controllers: [AppController],
  providers: [AppService],
  imports: [ForumModule, PostgresqlConnectionModule],
})
export class AppModule {}
