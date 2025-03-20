import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/mongodb.env`,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/postgresql.env`,
    }),
  ],
})
export class ConfigurationModule {}
