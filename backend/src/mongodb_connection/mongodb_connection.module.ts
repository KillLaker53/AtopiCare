import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.mongo_user}:${process.env.mongo_password}@${process.env.mongo_host}:27017`,
      {
        dbName: 'AtopiCare',
        directConnection: true,
      },
    ),
  ],
})
export class MongodbConnectionModule {}
