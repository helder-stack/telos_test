import { createConnection } from 'typeorm';
import {Content} from '../entities/Content.entity';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => { await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
          __dirname+"/../**/*.entity{.ts,.js}"
        ],
        synchronize:  true //não utilizar em prod
      });
    }
  }
];