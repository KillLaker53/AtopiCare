import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${process.env.postgres_host}`,
      port: 5432,
      username: `${process.env.postgres_user}`,
      password: `${process.env.postgres_password}`,
      database: `AtopiCare`,
      entities: [],
      synchronize: true,
    }),
  ],
})
export class PostgresqlConnectionModule {}
