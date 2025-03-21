import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UvApiService } from './uv_api.service';

@Controller('uv-api')
export class UvApiController {
    constructor(private uvApiService: UvApiService){}
    @Get("/uv-index")
    async getUvIndex(@Req() request: Request) {
        const currentUvIndex = await this.uvApiService.uvIndex();
        return {uvIndex: currentUvIndex};
    }
}
