import {Controller, Get, Req, Res} from '@nestjs/common';
import { Request } from 'express';
import { UvApiService } from './uv_api.service';
import { join } from 'path';

@Controller('uv-api')
export class UvApiController {
    constructor(private uvApiService: UvApiService){}
    @Get("/uv-index")
    async getUvIndex(@Req() request: Request) {
        console.log("Fetching UV index...");
        const currentUvIndex = await this.uvApiService.uvIndex();
        console.log("Fetched UV Index:", currentUvIndex);
        return [{
            uvIndex: currentUvIndex
        }];
    }

}
