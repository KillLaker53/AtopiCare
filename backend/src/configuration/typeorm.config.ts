import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config'

const config = {
  type: 'postgres',
  host: `${process.env.postgres_host}`,
  port: 5432,
  username: `${process.env.postgres_user}`,
  password: `${process.env.postgres_password}`,
  database: `atopicare`,
  entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
