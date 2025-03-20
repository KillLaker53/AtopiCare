import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from '../entity/analysis.entity';
import { User } from '../entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.postgres_host}`,
      port: 5432,
      username: `${process.env.postgres_user}`,
      password: `${process.env.postgres_password}`,
      database: `atopicare`,
      entities: [User, Analysis],
      synchronize: true,
    }),
  ],
})
export class PostgresqlConnectionModule {}
