import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis } from 'src/entity/analysis.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `${"10.2.10.157"}`,
      port: 5432,
      username: `${"adminadminadmin"}`,
      password: `${"passpasspass123"}`,
      database: `atopicare`,
      entities: [User, Analysis],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class PostgresqlConnectionModule {}
