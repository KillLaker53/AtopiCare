import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`./env/mongodb.env`, `./env/postgresql.env`, `./env/auth.env`, `./env/aws.env`],
    }),
  ],
})
export class ConfigurationModule {}
