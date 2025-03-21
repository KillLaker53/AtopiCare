import { Module } from '@nestjs/common';
import { UvApiController } from './uv_api.controller';
import { UvApiService } from './uv_api.service';

@Module({
  controllers: [UvApiController],
  providers: [UvApiService]
})
export class UvApiModule {}
