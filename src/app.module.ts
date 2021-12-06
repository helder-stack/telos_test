import { ContentService } from './services/Content.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import {ContentModule} from "./database/modules/Content.module";

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [ContentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
