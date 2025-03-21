import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UV_API_CONFIG } from 'src/configuration/openweathermap.config';
@Injectable()
export class UvApiService {
    private readonly apiUrl = UV_API_CONFIG.API_URL;
    private readonly apiKey = UV_API_CONFIG.API_KEY;
    private readonly lat = UV_API_CONFIG.LAT;
    private readonly lon = UV_API_CONFIG.LON;

    async uvIndex(): Promise<number> {
        const url = `${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`

        try{
            const response = await axios.get(url);
            return response.data.value;
        }catch(err){
            throw new Error("Failed to fetch uv index");
        }
    }
}