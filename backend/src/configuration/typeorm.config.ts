import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config'

const config = {
  type: 'postgres',
  host: `${"10.2.10.157"}`,
  port: 5432,
  username: `${"adminadminadmin"}`,
  password: `${"passpasspass123"}`,
  database: `atopicare`,
  entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
